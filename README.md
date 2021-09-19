# Atlas Scientific I2C - EZO Device Wrappers

This is collection of wrapper classes which handle working with EZO Devices over I2C in NodeJS.

# Install

This requires the PromisifiedBus class from i2c-bus
1. `npm install i2c-bus`
2. `npm install atlas-scientific-i2c`

# Getting Started



```
const as_dev=require('atlas-scientific-i2c');
const i2c = require('i2c-bus');

async function Test(){
        //open the i2c bus
        const bus = await i2c.openPromisified(1);
        //find all EZO devices
        const devs=await as_dev.FindAllDevices(bus);
        //print out all detected devices
        console.log(devs);
        //Loop through the list, using 'instanceof' to find the pH chip, and pull a reading from it.
        devs.forEach(async item=>{
                if(item instanceof as_dev.pH){
                        const r = await item.GetReading();
                        console.log('pH reading:'+r);
                }else{
                        //for everything else, print out the device's class
                        console.log(item.constructor.name);
                }
        });
}

Test();
```

# API

[JSDoc](api.md)