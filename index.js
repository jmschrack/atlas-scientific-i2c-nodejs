/**
 * The main entry point
 * @module atlas-scientific-i2c 
 */

const i2c = require('i2c-bus');
/**
 * Generic EZO device
 */
const EZODevice = require('./ezo_device.js').default;
/**
 * Peristaltic Pump class
 */
const Pump = require('./pump.js').default;
/**
 * pH circuit class
 */
const pH = require('./ph_meter.js').default;
/**
 * Dissolved Oxygen circuit class
 */
const DO = require('./do_meter.js').default;
/**
 * Oxidation Reduction Potential circuit class
 */
const ORP = require('./orp_meter.js').default;
/**
 * Electric Connectivity circuit class
 */
const EC = require('./ec_meter').default;

function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}


/**
 * Returns a promise that resolves into an array of available, EZO class devices.
 * This scans the i2c_bus for in use addresses. It sends each address the "I" info command, and if the response matches the EZO pattern, it will instantiate the corresponding wrapper class.
 * If the device is an unknown type, it will instantiate as a generic EZODevice. 
 * @param i2c_bus {PromisifiedBus}
 * @returns {Promise<Array>}
 */
 async function FindAllDevices(i2c_bus){
	const info = Buffer.from("I");
	const results = await i2c_bus.scan();
	const writesP=Promise.allSettled(results.map(addr=>{
					return i2c_bus.i2cWrite(addr,info.length,info);
			}));
	await writesP;
	await later(300);
	const readsP=await Promise.allSettled(results.map(addr=>{
			const rbuf= Buffer.alloc(16);
			return i2c_bus.i2cRead(addr,rbuf.length,rbuf);
	}));

	const devices=[];
	readsP.forEach((promResult,index)=>{
			if(promResult.status=="fulfilled"){
				//console.log(promResult.value.buffer.toString());
				const info=promResult.value.buffer.toString();
				if(info.indexOf("?I,")>-1){
					const devType=info.split(',')[1];
					if(devType=='PMP'){
						devices.push(new Pump(i2c_bus,results[index],info));
					}else if(devType=='pH'){
						devices.push(new pH(i2c_bus,results[index],info));
					}else if(devType=='DO'){
						devices.push(new DO(i2c_bus,results[index],info));
					}else if(devType=='EC'){
						devices.push(new EC(i2c_bus,results[index],info));
					}else if(devType=='ORP'){
						devices.push(new ORP(i2c_bus,results[index],info));
					}else{
						devices.push(new EZODevice(i2c_bus,results[index],info));
					}
				}

			}
	});
	return devices;
}


module.exports={FindAllDevices,EZODevice,Pump,pH,DO,ORP,EC}