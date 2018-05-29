const Gpio = require('onoff').Gpio;

const valve1 = new Gpio(17, 'out');
const valve2 = new Gpio(27, 'out');
const pump = new Gpio(18, 'out');
const fan = new Gpio(23, 'out');
const lights = new Gpio(24, 'out');
const pressureSwitch = new Gpio(25, 'in');

// 18 hours in milliseconds
const LIGHT_DURATION = 64800000;
// 6 hours in milliseconds
const LIGHT_OFF_DURATION = 21600000;
// 5 minutes in milliseconds
const WATER_PAUSE = 300000;
// 15 seconds in milliseconds
const PRESSURIZE_PAUSE = 15000;
// 3 seconds in milliseconds
const WATERING_TIME = 3000;

var device = {};

device.name = 'Homegrown Homedevice';

device.stats = {
   pressurizing: false,
   depressurizing: false,
   pressurized: false,
   lights: false,
   fan: false
};

/**
 * * Initial device condition
 */
device.on = function() {
   this.fanOn();
   this.lightsOn();
   this.deviceLoop();
}

device.onTest = function() {
   this.fanOn();
   this.lightsOff();
}

/**
 * * Power the device off
 */
device.off = function() {
   valve1.writeSync(0);
   valve2.writeSync(0);
   pump.writeSync(0);
   console.log('Device subsystems powering off');

   this.stats.pressurizing = false;
   this.stats.depressurizing = false;
   this.stats.lights = false;
   this.stats.fan = false;
}

/**
 * * Pressurize the holding tank
 */
device.pressurize = function() {
   valve1.writeSync(1);
   valve2.writeSync(0);
   pump.writeSync(1);
   console.log('Device pressurizing');

   this.stats.pressurizing = true;
   this.stats.depressurizing = false;
   sleep(PRESSURIZE_PAUSE);
}

/**
 * * Depressurize the holding tank (water the plants)
 */
device.depressurize = function() {
   valve1.writeSync(1);
   pump.writeSync(0);
   valve2.writeSync(1);
   console.log('Device depressurizing');

   this.stats.depressurizing = true;
   this.stats.pressurizing = false;
   this.stats.pressurized = false;
}

/**
 * * Open valve two and water them plants
 */
device.waterPlants = function() {
   valve1.writeSync(0);
   valve2.writeSync(1);
   pump.writeSync(0);
   console.log('Watering plants at ' + new Date());

   device.stats.pressurized = false;
}

/**
 * * Close all valves, stop the pump, stop watering them plants
 */
device.stopWatering = function() {
   valve1.writeSync(0);
   valve2.writeSync(0);
   pump.writeSync(0);
   console.log('Stopped watering plants at ' + new Date());
}

/**
 * * Run the device loop, water the plants, monitor lights, etc.
 */
device.deviceLoop = function() {
   // pressurize for 15 seconds
   this.pressurize();
   // set the number of cycles
   this.cycles = 10;
   // maintain the plants
   this.maintainPlants();
}

/**
 * * Maintain the plants - watering cycles and lighting cycles
 */
device.maintainPlants = function() {
   if (this.cycles == 0) {
      this.deviceLoop();
   }
   else if (this.cycles > 0) {
      console.log('\nwatering plants - ' + this.cycles + ' waterings left in this cycle\n');
      // water plants
      this.waterPlants();
      console.log('watering plants at ' + new Date());

      // water the plants for 3 seconds
      setTimeout(() => {
         // stop watering plants
         this.stopWatering();
         console.log('done watering plants at ' + new Date());

         // check to see if the lights need to be turned on/off
         this.queryLights();
         this.cycles = this.cycles - 1;

         // 5 minutes from now, water the plants again
         setTimeout(() => {
            this.maintainPlants();
         }, WATER_PAUSE);
      }, WATERING_TIME);
   }
}

/**
 * * Query the lights to see if they need to be turned on or off
 */
device.queryLights = function() {
   console.log('querying lights at ' + new Date());
   console.log(this.stats);

   // if the lights are on and they have been on for longer than the duration
   // turn em off
   if (this.stats.lights) {
      console.log('NOW: ' + new Date().getTime());
      console.log('END: ' + Number(this.stats.lightsStart + LIGHT_DURATION));
      if (new Date().getTime() >= this.stats.lightsStart + LIGHT_DURATION)
         this.lightsOff();
   }
   // if the lights are off and they have been off for longer than the duration
   // turn em on
   else {
      console.log('NOW: ' + new Date().getTime());
      console.log('END: ' + Number(this.stats.lightsOffStart + LIGHT_OFF_DURATION));
      if (new Date().getTime() >= this.stats.lightsOffStart + LIGHT_OFF_DURATION)
         this.lightsOn();
   }
}

/**
 * * Turn the fans on
 */
device.fanOn = function() {
   fan.writeSync(1);
   console.log('Fans on');

   device.stats.fan = true;
}

/**
 * * Turn the fans off
 */
device.fanOff = function() {
   fan.writeSync(0);
   console.log('Fans off');
   
   this.stats.fan = false;
}

/**
 * * Turn the lights on
 */
device.lightsOn = function() {
   lights.writeSync(1);

   this.stats.lights = true;
   this.stats.lightsOffStart = null;
   this.stats.lightsStart = new Date().getTime();

   console.log('Lights on at ' + this.stats.lightsStart);
}

/**
 * * Turn the lights off
 */
device.lightsOff = function() {
   lights.writeSync(0);

   this.stats.lights = false;
   this.stats.lightsStart = null;
   this.stats.lightsOffStart = new Date().getTime();

   console.log('Lights off at ' + this.stats.lightsOffStart);
}

/**
 * * Read from the pressure switch and set the device stats accordingly
 */
device.readPressure = function() {
   var pressurized = pressureSwitch.readSync();

   if (!pressurized) {
      this.stats.pressurized = true;
      console.log('device pressurized');
   }
   else {
      this.stats.pressurized = false;
      console.log('device not pressurized');
   }

   return pressurized;
}

device.waterPlants


// sleep function for the burst water delay
function sleep(delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

module.exports = device;
