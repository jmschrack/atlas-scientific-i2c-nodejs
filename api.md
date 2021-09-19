## Modules

<dl>
<dt><a href="#module_atlas-scientific-i2c">atlas-scientific-i2c</a></dt>
<dd><p>The main entry point</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#DO">DO</a></dt>
<dd><p>Wrapper class for DO EZO circuit</p>
</dd>
<dt><a href="#EC">EC</a></dt>
<dd><p>Wrapper class for EC EZO circuit</p>
</dd>
<dt><a href="#EZODevice">EZODevice</a></dt>
<dd><p>A generic Atlas Scientific EZO chip with a common subset of functions.</p>
</dd>
<dt><a href="#ORP">ORP</a></dt>
<dd><p>Wrapper class for ORP EZO circuit</p>
</dd>
<dt><a href="#pH">pH</a></dt>
<dd><p>Wrapper class for pH EZO circuit</p>
</dd>
<dt><a href="#Pump">Pump</a></dt>
<dd><p>Wrapper class for Peristaltic Pump</p>
</dd>
</dl>

<a name="module_atlas-scientific-i2c"></a>

## atlas-scientific-i2c
The main entry point


* [atlas-scientific-i2c](#module_atlas-scientific-i2c)
    * [~EZODevice](#module_atlas-scientific-i2c..EZODevice)
    * [~Pump](#module_atlas-scientific-i2c..Pump)
    * [~pH](#module_atlas-scientific-i2c..pH)
    * [~DO](#module_atlas-scientific-i2c..DO)
    * [~ORP](#module_atlas-scientific-i2c..ORP)
    * [~EC](#module_atlas-scientific-i2c..EC)
    * [~FindAllDevices(i2c_bus)](#module_atlas-scientific-i2c..FindAllDevices) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="module_atlas-scientific-i2c..EZODevice"></a>

### atlas-scientific-i2c~EZODevice
Generic EZO device

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..Pump"></a>

### atlas-scientific-i2c~Pump
Peristaltic Pump class

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..pH"></a>

### atlas-scientific-i2c~pH
pH circuit class

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..DO"></a>

### atlas-scientific-i2c~DO
Dissolved Oxygen circuit class

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..ORP"></a>

### atlas-scientific-i2c~ORP
Oxidation Reduction Potential circuit class

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..EC"></a>

### atlas-scientific-i2c~EC
Electric Connectivity circuit class

**Kind**: inner constant of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  
<a name="module_atlas-scientific-i2c..FindAllDevices"></a>

### atlas-scientific-i2c~FindAllDevices(i2c_bus) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns a promise that resolves into an array of available, EZO class devices.
This scans the i2c_bus for in use addresses. It sends each address the "I" info command, and if the response matches the EZO pattern, it will instantiate the corresponding wrapper class.
If the device is an unknown type, it will instantiate as a generic EZODevice.

**Kind**: inner method of [<code>atlas-scientific-i2c</code>](#module_atlas-scientific-i2c)  

| Param | Type |
| --- | --- |
| i2c_bus | <code>PromisifiedBus</code> | 

<a name="DO"></a>

## DO
Wrapper class for DO EZO circuit

**Kind**: global class  

* [DO](#DO)
    * [.ClearCalibration()](#DO+ClearCalibration)
    * [.CalibrateAtmosphericOxygen()](#DO+CalibrateAtmosphericOxygen)
    * [.Calibrate0DissolvedOxygen()](#DO+Calibrate0DissolvedOxygen)
    * [.IsCalibrated()](#DO+IsCalibrated) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.SetTemperatureCompensation(value, takeReading)](#DO+SetTemperatureCompensation) ⇒
    * [.GetTemperatureCompensation()](#DO+GetTemperatureCompensation) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.SetSalinityCompensation(value, isPpt)](#DO+SetSalinityCompensation)
    * [.GetSalinityCompensation()](#DO+GetSalinityCompensation) ⇒
    * [.SetPressureCompensation()](#DO+SetPressureCompensation)
    * [.GetPressureCompensation()](#DO+GetPressureCompensation) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.SetParameter(parameter, isEnabled)](#DO+SetParameter)
    * [.GetParametersEnabled()](#DO+GetParametersEnabled) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.GetReading()](#DO+GetReading) ⇒

<a name="DO+ClearCalibration"></a>

### dO.ClearCalibration()
Resets calibration settings

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+CalibrateAtmosphericOxygen"></a>

### dO.CalibrateAtmosphericOxygen()
Single Point Calibration for Atmospheric Oxygen

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+Calibrate0DissolvedOxygen"></a>

### dO.Calibrate0DissolvedOxygen()
Two Point Calibration for 0 Dissolved Oxygen

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+IsCalibrated"></a>

### dO.IsCalibrated() ⇒ <code>Promise.&lt;String&gt;</code>
Returns a status code on the calibtration state0 - uncalibrated1 - single point calibrated2 - two point calibrated

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+SetTemperatureCompensation"></a>

### dO.SetTemperatureCompensation(value, takeReading) ⇒
Sets the Temperature Compensation value. Optionally takes and returns an immediate reading.

**Kind**: instance method of [<code>DO</code>](#DO)  
**Returns**: If takeReading is true, it returns the Dissolved Oxygen reading. Otherwise, returns nothing.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Number</code> |  |  |
| takeReading | <code>boolean</code> | <code>false</code> | Defaults to false. |

<a name="DO+GetTemperatureCompensation"></a>

### dO.GetTemperatureCompensation() ⇒ <code>Promise.&lt;String&gt;</code>
Gets the current compensated temperature value

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+SetSalinityCompensation"></a>

### dO.SetSalinityCompensation(value, isPpt)
Sets the SalinityCompensation. If the conductivity of your water is less than 2,500μS this command is irrelevant

**Kind**: instance method of [<code>DO</code>](#DO)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Number</code> |  | Assumed μS unless isPpt=true. |
| isPpt | <code>boolean</code> | <code>false</code> | Defaults to false. |

<a name="DO+GetSalinityCompensation"></a>

### dO.GetSalinityCompensation() ⇒
Gets the current SalinityCompensation value and whether it is in μS or ppt

**Kind**: instance method of [<code>DO</code>](#DO)  
**Returns**: 'value' and 'isPpt'  
<a name="DO+SetPressureCompensation"></a>

### dO.SetPressureCompensation()
Sets the PressureCompensation value in kPa.This parameter can be omitted if the water is less than 10 meters deep

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+GetPressureCompensation"></a>

### dO.GetPressureCompensation() ⇒ <code>Promise.&lt;String&gt;</code>
Returns the current compensated pressure value in kPa.

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+SetParameter"></a>

### dO.SetParameter(parameter, isEnabled)
Sets the values to be returned when a reading is taken.'mg' - mg/L : enabled by default'%' - percent saturation : disabled by default

**Kind**: instance method of [<code>DO</code>](#DO)  

| Param | Type |
| --- | --- |
| parameter | <code>String</code> | 
| isEnabled | <code>boolean</code> | 

<a name="DO+GetParametersEnabled"></a>

### dO.GetParametersEnabled() ⇒ <code>Promise.&lt;String&gt;</code>
Gets a comma seperated string of the currently enabled parameters

**Kind**: instance method of [<code>DO</code>](#DO)  
<a name="DO+GetReading"></a>

### dO.GetReading() ⇒
Takes a sensor reading. Defaults to mg/L. Use SetParameter() to change return type

**Kind**: instance method of [<code>DO</code>](#DO)  
**Returns**: a CSV string if both mg/L and % sat are enabled  
<a name="EC"></a>

## EC
Wrapper class for EC EZO circuit

**Kind**: global class  

* [EC](#EC)
    * [.SetProbeType(value)](#EC+SetProbeType)
    * [.SetTemperatureCompensation(value, takeReading)](#EC+SetTemperatureCompensation) ⇒
    * [.GetTemperatureCompensation()](#EC+GetTemperatureCompensation) ⇒
    * [.SetParameter(parameter, isEnabled)](#EC+SetParameter)
    * [.GetParametersEnabled()](#EC+GetParametersEnabled) ⇒
    * [.SetTDSConversionFactor(value)](#EC+SetTDSConversionFactor)
    * [.GetTDSConversionFactor()](#EC+GetTDSConversionFactor) ⇒
    * [.GetReading()](#EC+GetReading) ⇒

<a name="EC+SetProbeType"></a>

### eC.SetProbeType(value)
Sets the probe type. '1.0' is the defaule valueCurrent known probe types:  '0.1','1.0', and '10'

**Kind**: instance method of [<code>EC</code>](#EC)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | floating point in ASCII |

<a name="EC+SetTemperatureCompensation"></a>

### eC.SetTemperatureCompensation(value, takeReading) ⇒
Sets Temperature Compensation value. Default is 25C.This is not maintained if power is cut.

**Kind**: instance method of [<code>EC</code>](#EC)  
**Returns**: Nothing unless takeReading=true  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | Celsius |
| takeReading | <code>boolean</code> | <code>false</code> | Defaults to false. If true, immediately returns a new reading after setting the value. |

<a name="EC+GetTemperatureCompensation"></a>

### eC.GetTemperatureCompensation() ⇒
Gets the current compensated temperature value.

**Kind**: instance method of [<code>EC</code>](#EC)  
**Returns**: floating point number in ASCII  
<a name="EC+SetParameter"></a>

### eC.SetParameter(parameter, isEnabled)
Enables/disables parameters from the output string.'EC' - conductivity'TDS' - total dissolved solids'S' - salintiy'SG' - specific gravity

**Kind**: instance method of [<code>EC</code>](#EC)  

| Param | Type |
| --- | --- |
| parameter | <code>String</code> | 
| isEnabled | <code>boolean</code> | 

<a name="EC+GetParametersEnabled"></a>

### eC.GetParametersEnabled() ⇒
Gets a CSV string of the enabled output parametersExample: 'EC,TDS,S,SG' if all are enabled

**Kind**: instance method of [<code>EC</code>](#EC)  
**Returns**: CSV string.  
<a name="EC+SetTDSConversionFactor"></a>

### eC.SetTDSConversionFactor(value)
Sets a custom TDS conversion factor. Default is 0.54.Common conversion factors:NaCl : 0.47-0.50KCL : 0.50-0.57"442" : 0.65-0.85

**Kind**: instance method of [<code>EC</code>](#EC)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value will be clamped to 0.01 - 1.00 range |

<a name="EC+GetTDSConversionFactor"></a>

### eC.GetTDSConversionFactor() ⇒
Gets the conversion factor being used.

**Kind**: instance method of [<code>EC</code>](#EC)  
**Returns**: string of floating point number  
<a name="EC+GetReading"></a>

### eC.GetReading() ⇒
Gets 1 reading.

**Kind**: instance method of [<code>EC</code>](#EC)  
**Returns**: CSV string of readings corresponding to enabled parameters  
<a name="EZODevice"></a>

## EZODevice
A generic Atlas Scientific EZO chip with a common subset of functions.

**Kind**: global class  

* [EZODevice](#EZODevice)
    * [new EZODevice(i2c_bus, address, info)](#new_EZODevice_new)
    * [.SendCommand(command)](#EZODevice+SendCommand) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.GetInfo()](#EZODevice+GetInfo) ⇒
    * [.GetProtocolLocked()](#EZODevice+GetProtocolLocked) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.Find()](#EZODevice+Find)
    * [.GetLED()](#EZODevice+GetLED) ⇒ <code>Boolean</code>
    * [.SetLED(isOn)](#EZODevice+SetLED)
    * [.SetName(name)](#EZODevice+SetName)
    * [.GetName()](#EZODevice+GetName) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.Sleep()](#EZODevice+Sleep)
    * [.ChangeI2CAddress(newAddress)](#EZODevice+ChangeI2CAddress)

<a name="new_EZODevice_new"></a>

### new EZODevice(i2c_bus, address, info)

| Param | Type | Description |
| --- | --- | --- |
| i2c_bus | <code>i2c.PromisifiedBus</code> | The shared PromisifiedBus for I2C connections. |
| address | <code>Number</code> | The i2c address |
| info | <code>String</code> | Cached info string from FindAllDevices |

<a name="EZODevice+SendCommand"></a>

### ezoDevice.SendCommand(command) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Sends a command to the device, waits 300ms, and then reads back the response.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  

| Param | Type |
| --- | --- |
| command | <code>String</code> | 

<a name="EZODevice+GetInfo"></a>

### ezoDevice.GetInfo() ⇒
Fetches the Info string from the device

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
**Returns**: Promise<String>  
<a name="EZODevice+GetProtocolLocked"></a>

### ezoDevice.GetProtocolLocked() ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns whether the Protocol currently is locked.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
<a name="EZODevice+Find"></a>

### ezoDevice.Find()
Finds the device with a white blinking LED. This will disable continuous mode.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
<a name="EZODevice+GetLED"></a>

### ezoDevice.GetLED() ⇒ <code>Boolean</code>
Return true if the LED is currently on.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
<a name="EZODevice+SetLED"></a>

### ezoDevice.SetLED(isOn)
Turns the LED On or Off

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  

| Param | Type |
| --- | --- |
| isOn | <code>Promise.&lt;Boolean&gt;</code> | 

<a name="EZODevice+SetName"></a>

### ezoDevice.SetName(name)
Stores a name string on the device.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Whitespace will be removed. If longer than 16 characters, only the first 16 will be sent. |

<a name="EZODevice+GetName"></a>

### ezoDevice.GetName() ⇒ <code>Promise.&lt;String&gt;</code>
Gets the stored name of this device

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
<a name="EZODevice+Sleep"></a>

### ezoDevice.Sleep()
Enters sleep/low-power mode. Send any character or command to awaken.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  
<a name="EZODevice+ChangeI2CAddress"></a>

### ezoDevice.ChangeI2CAddress(newAddress)
Changes the I2C Address. This causes the device to reboot.

**Kind**: instance method of [<code>EZODevice</code>](#EZODevice)  

| Param | Type |
| --- | --- |
| newAddress | <code>Number</code> | 

<a name="ORP"></a>

## ORP
Wrapper class for ORP EZO circuit

**Kind**: global class  

* [ORP](#ORP)
    * [.ClearCalibration()](#ORP+ClearCalibration)
    * [.Calibrate(value)](#ORP+Calibrate)
    * [.IsCalibrated()](#ORP+IsCalibrated) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.GetReading()](#ORP+GetReading) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="ORP+ClearCalibration"></a>

### orP.ClearCalibration()
Clears calibration data.

**Kind**: instance method of [<code>ORP</code>](#ORP)  
<a name="ORP+Calibrate"></a>

### orP.Calibrate(value)
Calibrates the ORP circuit to a set value.The EZO ORP circuit can be calibrated to any known ORP value.

**Kind**: instance method of [<code>ORP</code>](#ORP)  

| Param | Type |
| --- | --- |
| value | <code>Number</code> | 

<a name="ORP+IsCalibrated"></a>

### orP.IsCalibrated() ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns the calibration status

**Kind**: instance method of [<code>ORP</code>](#ORP)  
<a name="ORP+GetReading"></a>

### orP.GetReading() ⇒ <code>Promise.&lt;String&gt;</code>
Takes a single reading

**Kind**: instance method of [<code>ORP</code>](#ORP)  
<a name="pH"></a>

## pH
Wrapper class for pH EZO circuit

**Kind**: global class  

* [pH](#pH)
    * [.Read()](#pH+Read) ⇒ <code>Number</code>
    * [.ClearCalibration()](#pH+ClearCalibration)
    * [.IsCalibrated()](#pH+IsCalibrated) ⇒ <code>String</code>
    * [.CalibrateMid(ph)](#pH+CalibrateMid)
    * [.CalibrateLow(ph)](#pH+CalibrateLow)
    * [.CalibrateHigh(ph)](#pH+CalibrateHigh)
    * [.GetReading()](#pH+GetReading) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.GetTemperatureCompensation()](#pH+GetTemperatureCompensation) ⇒
    * [.SetTemperatureCompensation(value, takeReading)](#pH+SetTemperatureCompensation) ⇒
    * [.GetSlope()](#pH+GetSlope) ⇒

<a name="pH+Read"></a>

### pH.Read() ⇒ <code>Number</code>
Gets a single pH reading

**Kind**: instance method of [<code>pH</code>](#pH)  
<a name="pH+ClearCalibration"></a>

### pH.ClearCalibration()
Resets all calibration points to ideal.

**Kind**: instance method of [<code>pH</code>](#pH)  
<a name="pH+IsCalibrated"></a>

### pH.IsCalibrated() ⇒ <code>String</code>
Returns numbers of Calibration points (0-3)

**Kind**: instance method of [<code>pH</code>](#pH)  
<a name="pH+CalibrateMid"></a>

### pH.CalibrateMid(ph)
Performs single point calibration at the mid point.WARNING: This will clear any previous calibration!

**Kind**: instance method of [<code>pH</code>](#pH)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ph | <code>Number</code> | <code>7</code> | defaults to 7.00 |

<a name="pH+CalibrateLow"></a>

### pH.CalibrateLow(ph)
Performs two point calibration at low point.

**Kind**: instance method of [<code>pH</code>](#pH)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ph | <code>Number</code> | <code>4</code> | defaults to 4.00 |

<a name="pH+CalibrateHigh"></a>

### pH.CalibrateHigh(ph)
Performs three point calibration at high point

**Kind**: instance method of [<code>pH</code>](#pH)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ph | <code>Number</code> | <code>10</code> | defaults to 10.0 |

<a name="pH+GetReading"></a>

### pH.GetReading() ⇒ <code>Promise.&lt;String&gt;</code>
Takes a single pH reading

**Kind**: instance method of [<code>pH</code>](#pH)  
<a name="pH+GetTemperatureCompensation"></a>

### pH.GetTemperatureCompensation() ⇒
Gets the current Temperature Compensation in degrees Celsius.

**Kind**: instance method of [<code>pH</code>](#pH)  
**Returns**: Celsius  
<a name="pH+SetTemperatureCompensation"></a>

### pH.SetTemperatureCompensation(value, takeReading) ⇒
Sets the Temperature Compensation value.  This is lost when power is cut.

**Kind**: instance method of [<code>pH</code>](#pH)  
**Returns**: Nothing unless takeReading=true  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  |  |
| takeReading | <code>boolean</code> | <code>false</code> | Defaults false. If true, will return a pH reading immediately. |

<a name="pH+GetSlope"></a>

### pH.GetSlope() ⇒
After calibrating, shows how closely (in percentage) the calibrated pH probe is working compared to the “ideal” pH probe.

**Kind**: instance method of [<code>pH</code>](#pH)  
**Returns**: 'acid' and 'base' are percentages where 100% matches the ideal probe.  'zeroPoint' is the millivolt offset from true zero.  
<a name="Pump"></a>

## Pump
Wrapper class for Peristaltic Pump

**Kind**: global class  

* [Pump](#Pump)
    * [.StartDispensing(reverse)](#Pump+StartDispensing)
    * [.StopDispensing()](#Pump+StopDispensing) ⇒
    * [.Dispense(ml)](#Pump+Dispense)
    * [.Dose(ml, min)](#Pump+Dose)
    * [.DispenseConstantRate(rate, min)](#Pump+DispenseConstantRate)
    * [.PauseDispensing()](#Pump+PauseDispensing)
    * [.IsPaused()](#Pump+IsPaused) ⇒
    * [.GetPumpVoltage()](#Pump+GetPumpVoltage) ⇒
    * [.GetReading()](#Pump+GetReading) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.GetTotalDispensedVolume(absolute)](#Pump+GetTotalDispensedVolume) ⇒
    * [.ClearTotalDispensedVolume()](#Pump+ClearTotalDispensedVolume)
    * [.isCalibrated()](#Pump+isCalibrated) ⇒
    * [.SetParameters(parameter, isEnabled)](#Pump+SetParameters)
    * [.GetParametersEnabled()](#Pump+GetParametersEnabled) ⇒
    * [.SetName(name)](#Pump+SetName)
    * [.GetName()](#Pump+GetName) ⇒ <code>null</code>

<a name="Pump+StartDispensing"></a>

### pump.StartDispensing(reverse)
This will begin continuously dispensing liquid until Pause or Stop is given.

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param | Type |
| --- | --- |
| reverse | <code>boolean</code> | 

<a name="Pump+StopDispensing"></a>

### pump.StopDispensing() ⇒
Stops dispensing. Returns the volume of liquid that has been dispensed.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: String  
<a name="Pump+Dispense"></a>

### pump.Dispense(ml)
Dispenses the given amount. Negative amounts will run the pump in reverse

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param | Type |
| --- | --- |
| ml | <code>String</code> | 

<a name="Pump+Dose"></a>

### pump.Dose(ml, min)
Dispenses the given volume  over the given minutes.

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param | Type | Description |
| --- | --- | --- |
| ml | <code>Number</code> | Amount |
| min | <code>Number</code> | Minutes |

<a name="Pump+DispenseConstantRate"></a>

### pump.DispenseConstantRate(rate, min)
Maintain a constant flow rate.

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param | Type | Description |
| --- | --- | --- |
| rate | <code>Number</code> | (ml/min) |
| min | <code>String</code> | Minutes to maintain this rate. Use '*' for indefinite time. |

<a name="Pump+PauseDispensing"></a>

### pump.PauseDispensing()
Pauses Dispensing.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
<a name="Pump+IsPaused"></a>

### pump.IsPaused() ⇒
Checks if the unit is currently paused

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: boolean  
<a name="Pump+GetPumpVoltage"></a>

### pump.GetPumpVoltage() ⇒
Gets the current voltage across the Pump's terminals.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: String  
<a name="Pump+GetReading"></a>

### pump.GetReading() ⇒ <code>Promise.&lt;Number&gt;</code>
Gets a single value showing dispensed volume.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
<a name="Pump+GetTotalDispensedVolume"></a>

### pump.GetTotalDispensedVolume(absolute) ⇒
Shows the total volume (ml) dispensed by the pump. This data is erased if the pump loses power.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: ml  

| Param | Type | Description |
| --- | --- | --- |
| absolute | <code>boolean</code> | Get the absolute total volume instead. |

<a name="Pump+ClearTotalDispensedVolume"></a>

### pump.ClearTotalDispensedVolume()
Clears the total dispensed volume.

**Kind**: instance method of [<code>Pump</code>](#Pump)  
<a name="Pump+isCalibrated"></a>

### pump.isCalibrated() ⇒
Returns a single number indicating calibration status.0 - uncalibrated1 - fixed volume2 - volume over time3 - both

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: String  
<a name="Pump+SetParameters"></a>

### pump.SetParameters(parameter, isEnabled)
Enables/Disables the specified parameter. 'V' - volume being pumped. 'TV' - total volume being pumped. 'ATV' - absolute total volume being pumped

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param | Type |
| --- | --- |
| parameter | <code>String</code> | 
| isEnabled | <code>Boolean</code> | 

<a name="Pump+GetParametersEnabled"></a>

### pump.GetParametersEnabled() ⇒
Returns a comma seperated string of the currently enabled parameters

**Kind**: instance method of [<code>Pump</code>](#Pump)  
**Returns**: Promise<String>  
<a name="Pump+SetName"></a>

### pump.SetName(name)
This is not supported on the Atlas Scientific Peristaltic Pumps

**Kind**: instance method of [<code>Pump</code>](#Pump)  

| Param |
| --- |
| name | 

<a name="Pump+GetName"></a>

### pump.GetName() ⇒ <code>null</code>
This is not supported on the Atlas Scientific Peristaltic Pumps

**Kind**: instance method of [<code>Pump</code>](#Pump)  
