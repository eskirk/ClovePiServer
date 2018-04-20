// https://github.com/momenso/node-dht-sensor

var rpio = require('rpio');
var PIN_READ = 0, PIN_WRITE = 0;

// set up pins 
// rpio.open(PIN_READ, rpio.INPUT)

/**
 * * read input from specified port 
 * 
 * @param pin - the pin to be read from
 */
function readPin(pin, err) {
   if (err) throw err;
   // read from pin
}

/**
 * * write to a raspberry pi pin
 * 
 * @param pin - the pin to be written to
 */
function writePin(pin, err) {
   if (err) throw err;
   // write to pin
}