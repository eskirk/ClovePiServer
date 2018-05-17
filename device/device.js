const Gpio = require('onoff').Gpio;

const valve1 = new Gpio(17, 'out');
const valve2 = new Gpio(27, 'out');
const pump = new Gpio(18, 'out');
const fan = new Gpio(23, 'out');
const lights = new Gpio(24, 'out');
const pressureSwitch = Gpio(25, 'in');

var device = {};

device.name = "Homegrown Homedevice";

device.stats = {
   pressurizing: false,
   depressurizing: false,
   lights: false,
   fan: false
};

/**
 * * Power the device off
 */
device.off = function() {
   valve1.writeSync(0);
   valve2.writeSync(0);
   pump.writeSync(0);
   console.log("Device subsystems powering off");

   device.stats.pressurizing = false;
   device.stats.depressurizing = false;
   device.stats.lights = false;
   device.stats.fan = false;
}

/**
 * * Pressurize the holding tank
 */
device.pressurize = function() {
   valve1.writeSync(1);
   valve2.writeSync(0);
   pump.writeSync(1);
   console.log("Device pressurizing");

   device.stats.pressurizing = true;
   device.stats.depressurizing = false;
}

/**
 * * Depressurize the holding tank (water the plants)
 */
device.depressurize = function() {
   valve1.writeSync(1);
   pump.writeSync(0);
   valve2.writeSync(1);
   console.log("Device depressurizing");

   device.stats.depressurizing = true;
   device.stats.pressurizing = false;
}

/**
 * * Turn the fans on
 */
device.fanOn = function() {
   fan.writeSync(1);
   console.log("Fans on");

   device.stats.fan = true;
}

/**
 * * Turn the fans off
 */
device.fanOff = function() {
   fan.writeSync(0);
   console.log("Fans off");
   
   device.stats.fan = false;
}

/**
 * * Turn the lights on
 */
device.lightsOn = function() {
   lights.writeSync(1);
   console.log("Lights on");

   device.stats.lights = true;
}

/**
 * * Turn the lights off
 */
device.lightsOff = function() {
   lights.writeSync(0);
   console.log("Lights off");

   device.stats.lights = false;
}

module.exports = device;
