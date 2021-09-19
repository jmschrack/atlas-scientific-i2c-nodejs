const EZODevice = require('./ezo_device.js').default;

class DO extends EZODevice{

    async ClearCalibration(){
        await this.SendCommand('Cal,clear');
    }
    async CalibrateAtmosphericOxygen(){
        this.waitTime=1300;
        await this.SendCommand('Cal');
        this.waitTime=300;
    }
    async Calibrate0DissolvedOxygen(){
        this.waitTime=1300;
        await this.SendCommand('Cal,0');
        this.waitTime=300;
    }

    /**
     * Returns a status code on the calibtration state
     * 
     * 0 - uncalibrated
     * 
     * 1 - single point calibrated
     * 
     * 2 - two point calibrated
     * @returns 
     */
    async IsCalibrated(){
        const cmd='Cal,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Sets the Temperature Compensation value. Optionally takes and returns an immediate reading.
     * @param {Number} value 
     * @param {boolean} takeReading Defaults to false. 
     * @returns If takeReading is true, it returns the Dissolved Oxygen reading. Otherwise, returns nothing.
     */
    async SetTemperatureCompensation(value, takeReading=false){
        let cmd = 'T,';
        if(takeReading){
            this.waitTime=900;
            cmd='RT,';
            const r = (await this.SendCommand(cmd+value)).toString('ascii',cmd.length+1);
            this.waitTime=300;
            return r;
        }else{
            await this.SendCommand(cmd+value);
            return null;
        }
    }

    /**
     * Gets the current compensated temperature value
     * @returns 
     */
    async GetTemperatureCompensation(){
        const cmd='T,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Sets the SalinityCompensation. 
     * 
     * If the conductivity of your water is less than 2,500μS this command is irrelevant
     * @param {Number} value Assumed μS unless isPpt=true.
     * @param {boolean} isPpt Defaults to false. 
     */
    async SetSalinityCompensation(value,isPpt=false){
        await this.SendCommand('S,'+value+(isPpt?',ppt':''));
    }

    /**
     * Gets the current SalinityCompensation value and whether it is in μS or ppt
     * @returns 'value' and 'isPpt'
     */
    async GetSalinityCompensation(){
        const cmd = 'S,?';
        const resp=(await this.SendCommand(cmd)).toString('ascii',cmd.length+1).split(',');
        return {value:resp[0],
                isPpt:(resp[1]=='ppt')}
    }

    /**
     * Sets the PressureCompensation value in kPa.
     * 
     * This parameter can be omitted if the water is less than 10 meters deep
     * @param {Number} value 
     */
    async SetPressureCompensation(value){
        await this.SendCommand('P,'+value);
    }

    /**
     * Returns the current compensated pressure value in kPa.
     * @returns 
     */
    async GetPressureCompensation(){
        const cmd='P,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Sets the values to be returned when a reading is taken.
     * 
     * 'mg' - mg/L : enabled by default
     * 
     * '%' - percent saturation : disabled by default
     * @param {String} parameter 
     * @param {boolean} isEnabled 
     */
    async SetParameter(parameter,isEnabled){
        await this.SendCommand('O,'+parameter+','+(isEnabled?'1':'0'));
    }

    /**
     * Gets a comma seperated string of the currently enabled parameters
     * @returns 
     */
    async GetParametersEnabled(){
        const cmd='O,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Takes a sensor reading. Defaults to mg/L. Use SetParameter() to change return type
     * @returns a CSV string if both mg/L and % sat are enabled
     */
    async GetReading(){
        this.waitTime=600;
        const r =(await this.SendCommand('R')).toString('ascii',1);
        this.waitTime=300;
        return r;
    }
}

module.exports = DO;
module.exports.default=DO;