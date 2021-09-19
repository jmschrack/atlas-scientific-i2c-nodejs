const i2c = require('i2c-bus');
const EZODevice = require('./ezo_device.js').default;

class Pump extends EZODevice {
	

    /**
     * This will begin continuously dispensing liquid until Pause or Stop is given.
     * @param {boolean} reverse 
     */
	async StartDispensing(reverse){
		if(reverse){
			await this.SendCommand("D,-*");
		}else{
			await this.SendCommand("D,*");
		}
	}

    /**
     * Stops dispensing. Returns the volume of liquid that has been dispensed.
     * @returns String
     */
	async StopDispensing(){
		//_*DONE,v
		return (await this.SendCommand("X")).toString().split(',')[1];
	}

    /**
     * Dispenses the given amount. Negative amounts will run the pump in reverse
     * @param {String} ml 
     */
	async Dispense(ml){
		await this.SendCommand("D,"+ml);
	
	}

    /**
     * Dispenses the given volume  over the given minutes.
     * @param {Number} ml Amount
     * @param {Number} min Minutes
     */
	async Dose(ml,min){
		await this.SendCommand(`D,${ml},${min}`);
	}

    /**
     * Maintain a constant flow rate.
     * @param {Number} rate (ml/min) 
     * @param {String} min Minutes to maintain this rate. Use '*' for indefinite time.
     */
	async DispenseConstantRate(rate,min){
		await this.SendCommand(`DC,${rate},${min}`);
	}

	
	
	/**
     * Pauses Dispensing.
     */
	async PauseDispensing(){
		await this.SendCommand('P');
	}

    /**
     * Checks if the unit is currently paused
     * @returns boolean
     */
    async IsPaused(){
        const cmd = 'P,?';
        //returns _?P,n
        return ((await this.SendCommand(cmd))[cmd.length+1]==1);
    }
	
    /**
     * Gets the current voltage across the Pump's terminals.
     * @returns String
     */
	async GetPumpVoltage(){
        const cmd='PV,?';
		return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
	}
	
    /**
     * Gets a single value showing dispensed volume.
     * @returns 
     */
    async GetReading(){
       return Number.parseFloat((await this.SendCommand('R')).toString('ascii',1));
    }

    /**
     * Shows the total volume (ml) dispensed by the pump. 
     * 
     * This data is erased if the pump loses power.
     * @param {boolean} absolute Get the absolute total volume instead.
     * @returns  ml
     */
	async GetTotalDispensedVolume(absolute){
        let cmd='TV,?';
		if(absolute){
            cmd = 'ATV,?';
        }
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
	}

    /**
     * Clears the total dispensed volume. 
     */
	async ClearTotalDispensedVolume(){
		await this.SendCommand('clear');
	}

    

    /**
     * Returns a single number indicating calibration status.
     * 
     * 0 - uncalibrated
     * 
     * 1 - fixed volume
     * 
     * 2 - volume over time
     * 
     * 3 - both
     * @returns String
     */
	async isCalibrated(){
		//returns _?Cal,n
		
        const cmd ='Cal,?';
		return (await this.SendCommand(cmd))[cmd.length+1];
	}

	async Calibrate(volume){
		await this.SendCommand('Cal,'+volume);
	}
	async ClearCalibration(){
		await this.SendCommand('Cal,clear');
	}

    /**
     * Enables/Disables the specified parameter. 
     * 
     * 'V' - volume being pumped. 
     * 
     * 'TV' - total volume being pumped. 
     * 
     * 'ATV' - absolute total volume being pumped
     * @param {String} parameter 
     * @param {Boolean} isEnabled 
     */
    async SetParameters(parameter,isEnabled){
        await this.SendCommand(`O,${parameter},${(isEnabled?1:0)}`);
    }

    /**
     * Returns a comma seperated string of the currently enabled parameters
     * @returns Promise<String>
     */
    async GetParametersEnabled(){
        const cmd = 'O,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * This is not supported on the Atlas Scientific Peristaltic Pumps
     * @param name 
     */
    SetName(name){
       //Pumps do not support
    }

    /**
     * This is not supported on the Atlas Scientific Peristaltic Pumps
     * @returns {null}
     */
    GetName(){
        return 0;
    }

}
module.exports = Pump;
module.exports.default=Pump;