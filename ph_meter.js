const i2c = require('i2c-bus');
const EZODevice = require('./ezo_device.js').default;

/**
 * Wrapper class for pH EZO circuit
 */
class pH extends EZODevice{
   

    /**
     * Gets a single pH reading
     * @returns {Number}
     */
    async Read(){
        const resp=await this.SendCommand('R');
        return Number.parseFloat(resp.toString('ascii',1));
    }

    /**
     * Resets all calibration points to ideal.
     */
    async ClearCalibration(){
        await this.SendCommand("Cal,clear");
    }

    /**
     * Returns numbers of Calibration points (0-3)
     * @returns {String}
     */
    async IsCalibrated(){
        const cmd='Cal,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    } 

    /**
     * Performs single point calibration at the mid point.
     * WARNING: This will clear any previous calibration!
     * @param {Number} ph defaults to 7.00
     */
    async CalibrateMid(ph=7.00){
        this.waitTime=900;
        await this.SendCommand('Cal,mid,'+ph.toString());
        this.waitTime=300;
    }

    /**
     * Performs two point calibration at low point.
     * @param {Number} ph defaults to 4.00
     */
    async CalibrateLow(ph=4.00){
        this.waitTime=900;
        await this.SendCommand('Cal,low,'+ph.toString());
        this.waitTime=300;
    }

    /**
     * Performs three point calibration at high point
     * @param {Number} ph defaults to 10.0
     */    
    async CalibrateHigh(ph=10.00){
        this.waitTime=900;
        await this.SendCommand('Cal,high,'+ph.toString());
        this.waitTime=300;
    }

    /**
     * Takes a single pH reading
     * @returns {Promise<String>}
     */
    async GetReading(){
        this.waitTime=900;
        const r= (await this.SendCommand('R')).toString('ascii',1);
        this.waitTime=300;
        return r;
    }    

    /**
     * Gets the current Temperature Compensation in degrees Celsius. 
     * @returns Celsius
     */
    async GetTemperatureCompensation(){
        const cmd='T,?';
        return (await this.SendCommand(cmd)).toString('ascii',cmd.length+1);
    }

    /**
     * Sets the Temperature Compensation value.  This is lost when power is cut.
     * @param {number} value 
     * @param {boolean} takeReading Defaults false. If true, will return a pH reading immediately.
     * @returns Nothing unless takeReading=true
     */
    async SetTemperatureCompensation(value,takeReading=false){
        if(takeReading){
            this.waitTime=900;
            const r= (await this.SendCommand('RT,'+value)).toString('ascii',1);
            this.waitTime=300;
            return r;
        }else{
            await this.SendCommand('T,'+value);
        }
    }

    /**
     * After calibrating, shows how closely (in percentage) the calibrated pH probe is working compared to the “ideal” pH probe. 
     * @returns 'acid' and 'base' are percentages where 100% matches the ideal probe.  'zeroPoint' is the millivolt offset from true zero.
     */
    async GetSlope(){
        const cmd = 'Slope,?';
        let resp = (await this.SendCommand(cmd)).toString(cmd.length+1).split(',');
        return { acid:resp[0],
                base:resp[1],
                zeroPoint:resp[2]        
        }
    }
}

module.exports = pH;
module.exports.default=pH;