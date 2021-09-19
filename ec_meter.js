const EZODevice = require('./ezo_device.js').default;

class EC extends EZODevice{
    constructor(i2c_bus,address,info){
        super(i2c_bus,address,info);
        this.readBufferSize=40;
    }

    /**
     * Sets the probe type. '1.0' is the defaule value
     * 
     * Current known probe types:  '0.1','1.0', and '10' 
     * @param {String} value floating point in ASCII 
     */
    async SetProbeType(value){
        await this.SendCommand('K,'+value);
    }

    async GetProbeType(){
        const cmd='K,?';
        this.waitTime=600;
        //returns K,n
        //strange:  normally these commands have a '?' prefixed to their return message
        const k = (await this.SendCommand(cmd)).toString('ascii',cmd.length);
        this.waitTime=300;
        return k;
    }

    /**
     * Sets Temperature Compensation value. Default is 25C.
     * 
     * This is not maintained if power is cut.
     * @param {number} value Celsius
     * @param {boolean} takeReading Defaults to false. If true, immediately returns a new reading after setting the value. 
     * @returns Nothing unless takeReading=true
     */
    async SetTemperatureCompensation(value,takeReading=false){
        if(takeReading){
            await this.SendCommand('T,'+value);
            return null;
        }else{
            this.waitTime=900;
            const r = (await this.SendCommand('RT,'+value)).toString('ascii',1);
            this.waitTime=300;
            return r;
        }
    }

    /**
     * Gets the current compensated temperature value.
     * @returns floating point number in ASCII
     */
    async GetTemperatureCompensation(){
        const cmd='T,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Enables/disables parameters from the output string.
     * 
     * 'EC' - conductivity
     * 
     * 'TDS' - total dissolved solids
     * 
     * 'S' - salintiy
     * 
     * 'SG' - specific gravity
     * @param {String} parameter 
     * @param {boolean} isEnabled 
     */
    async SetParameter(parameter,isEnabled){
        await this.SendCommand('O,'+parameter+','+(isEnabled?'1':'0'));
    }

    /**
     * Gets a CSV string of the enabled output parameters
     * 
     * Example: 'EC,TDS,S,SG' if all are enabled
     * @returns CSV string.
     */
    async GetParametersEnabled(){
        const cmd = 'O,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Sets a custom TDS conversion factor. Default is 0.54.
     * 
     * Common conversion factors:
     * 
     * NaCl : 0.47-0.50
     * 
     * KCL : 0.50-0.57
     * 
     * "442" : 0.65-0.85
     * @param {number} value Value will be clamped to 0.01 - 1.00 range
     */
    async SetTDSConversionFactor(value){
        value = Math.min(1.00,Math.max(value,0.01));
        await this.SendCommand('TDS,'+value);
    }

    /**
     * Gets the conversion factor being used.
     * @returns string of floating point number
     */
    async GetTDSConversionFactor(){
        const cmd='TDS,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Gets 1 reading.
     * @returns CSV string of readings corresponding to enabled parameters
     */
    async GetReading(){
        this.waitTime=600;
        const r= (await this.SendCommand('R')).toString('ascii',1);
        this.waitTime=300;
        return r;
    }
}

module.exports = EC;
module.exports.default= EC;