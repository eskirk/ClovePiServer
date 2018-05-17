const Gpio = require('onoff').Gpio;

const valve1 = new Gpio(17, 'out');
const valve2 = new Gpio(27, 'out');
const pump = new Gpio(18, 'out');
// TODO
// const fan = new Gpio(null, null);
// const lights = new Gpio(null, null);


var device = {};

/**
 * * Power the device off
 */
device.off = function() {
   valve1.writeSync(0);
   valve2.writeSync(0);
   pump.writeSync(0);
   console.log("Device powering off");
}

/**
 * * Pressurize the holding tank
 */
device.pressurize = function() {
   valve1.writeSync(1);
   valve2.writeSync(0);
   pump.writeSync(1);
   console.log("Device pressurizing");
}

/**
 * * Depressurize the holding tank (water the plants)
 */
device.depressurize = function() {
   valve1.writeSync(1);
   pump.writeSync(0);
   valve2.writeSync(1);
   console.log(result.command);
}

module.exports = device;
