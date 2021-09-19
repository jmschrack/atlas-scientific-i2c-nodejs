const i2c = require('i2c-bus');



/*
 * Static
 */

const waitTime=300;


/**
 * A generic Atlas Scientific EZO chip with a common subset of functions.
 */
class EZODevice {
	/**
	 * 
	 * @param {i2c.PromisifiedBus} i2c_bus The shared PromisifiedBus for I2C connections.
	 * @param {Number} address The i2c address
	 * @param {String} info Cached info string from FindAllDevices
	 */
	constructor(i2c_bus,address,info){
		this.i2c_bus=i2c_bus;
		this.address=address;
		this.waitTime=waitTime;
		this.readBufferSize=16;
		this.info=info;
	
	}
	
	Delay(){
		return new Promise((resolve,reject)=>{
			setTimeout(resolve,this.waitTime);
		});
	}

	/**
	 * Sends a command to the device, waits 300ms, and then reads back the response.
	 * @param {String} command 
	 * @returns {Promise<Buffer>}
	 */
	SendCommand(command){
		const wbuf=Buffer.from(command);
		const rbuf=Buffer.alloc(this.readBufferSize);
		return new Promise((resolve,reject)=>{
			this.i2c_bus.i2cWrite(this.address,wbuf.length,wbuf).then(async _=>{
				await this.Delay();
				let r;
				try{
					r = await this.i2c_bus.i2cRead(this.address,rbuf.length,rbuf);
					//more than 16 bytes, so we need to keep reading
					if(r.buffer.indexOf(0)<0){
						let nr=Buffer.concat([r.buffer]);
						while(r.buffer.indexOf(0)<0){
							r= await this.i2c_bus.i2cRead(this.address,rbuf.length,rbuf);
							nr=Buffer.concat([nr,r.buffer]);
						}
						resolve(nr);
					}else{
						resolve(rbuf);
					}
				}catch(e){reject(e);}
			}).catch(reject);
		});
	}

	/*
	NOTE: all responses start with 0x1, and usually repeat the command that was sent.
	*/

	Factory(){
		//the device reboots, so there will be nothing to read.
		//Just eat any errors that might crop up.
		this.SendCommand("Factory").catch(error=>{});
	}

	/**
	 * Fetches the Info string from the device
	 * @returns Promise<String>
	 */
	GetInfo(){
			return this.SendCommand("I");
	}

	async SetProtocolLock(lock){
		await this.SendCommand('Plock,'+(lock?1:0));
	}

	/**
	 * Returns whether the Protocol currently is locked.
	 * @returns {Promise<boolean>}
	 */
	async GetProtocolLocked(){
		const cmd='Plock,?';
		//response: _?Plock,n
		return (await this.SendCommand(cmd))[cmd.length+1]=='1';
	}

	/**
	 * Finds the device with a white blinking LED. This will disable continuous mode.
	 */
	async Find(){
		await this.SendCommand('Find');
	}

	/**
	 * Return true if the LED is currently on.
	 * @returns {Boolean}
	 */
	async GetLED(){
		const cmd='L,?';
		//respose: _?L,n
		return (await this.SendCommand(cmd))[cmd.length+1]=='1';
	}
	/**
	 * Turns the LED On or Off
	 * @param {Promise<Boolean>} isOn 
	 */
	async SetLED(isOn){
		await this.SendCommand('L,'+(isOn?1:0));
	}

	/**
	 * Stores a name string on the device.
	 * @param {String} name Whitespace will be removed. If longer than 16 characters, only the first 16 will be sent. 
	 */
	async SetName(name){
        let n=name.replace(' ','');
        if(n.length>16)
            n=n.substr(0,16); 
        await this.SendCommand('Name,'+n)
    }

	/**
	 * Gets the stored name of this device
	 * @returns {Promise<String>}
	 */
    async GetName(){
        const cmd="Name,?";
        const resp=await this.SendCommand(cmd);
        return resp.toString('ascii',cmd.length+1);
    }

	/**
     * Enters sleep/low-power mode. Send any character or command to awaken.
     */
	 async Sleep(){
		const wbuf=Buffer.from('Sleep');
		await this.i2c_bus.i2cWrite(this.address,wbuf.length,wbuf);
	}

	/**
	 * Changes the I2C Address. This causes the device to reboot.
	 * @param {Number} newAddress 
	 */
	async ChangeI2CAddress(newAddress){
		const wbuf=Buffer.from(`I2C,${newAddress}`);
		this.i2c_bus.i2cWrite(this.address,wbuf.length,wbuf);
		this.address=newAddress
	}
}

module.exports = EZODevice;
module.exports.default = EZODevice;
