const EZODevice = require('./ezo_device.js').default;

class ORP extends EZODevice{

    /**
     * Clears calibration data.
     */
    async ClearCalibration(){
        await this.SendCommand('Cal,clear');
    }

    /**
     * Calibrates the ORP circuit to a set value.
     * 
     * The EZO ORP circuit can be calibrated to any known ORP value.
     * @param {Number} value 
     */
    async Calibrate(value){
        this.waitTime=900;
        await this.SendCommand('Cal,'+value);
        this.waitTime=300;
    }

    /**
     * Returns the calibration status
     * @returns 
     */
    async IsCalibrated(){
        const cmd='Cal,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1)=='1';
    }

    /**
     * Takes a single reading
     * @returns 
     */
    async GetReading(){
        this.waitTime=900;
        const r= (await this.SendCommand('R')).toString('ascii',1);
        this.waitTime=300;
        return r;
    }
}

module.exports = ORP;
module.exports.default = ORP;