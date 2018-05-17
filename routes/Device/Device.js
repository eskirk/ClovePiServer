var express = require('express');
var router = express.Router({caseSensitive: true});
var async = require('async');

const device = require('../../device/device');

router.baseUrl = '/Device';

// route: {{url}}/Device
router.get('/', (req, res) => {
   res.send(device.name);
});

// route: {{url}}/Device/stats
router.get('/stats', (req, res) => {
   res.send(device.stats);
});

// route: {{url}}/Device/pressure/status
router.get('/pressure/status', (req, res) => {
   device.readPressure();
   res.send(device.stats.pressurized);
});

// route: {{url}}/Device/off
router.put('/off', (req, res) => {
   device.off();
   res.send('device powering off');
});

// route: {{url}}/Device/pressurize
router.put('/pressurize', (req, res) => {
   device.pressurize();
   res.send('device pressurizing');
});

// route: {{url}}/Device/depressurize
router.put('/depressurize', (req, res) => {
   device.depressurize();
   res.send('device depressurizing');
});

router.put('/water', (req, res) => {
   device.waterPlants();
   res.send('watering plants');
});

// route: {{url}}/Device/lights/on
router.put('/lights/on', (req, res) => {
   device.lightsOn();
   res.send('lights on');
});

// route: {{url}}/Device/lights/off
router.put('/lights/off', (req, res) => {
   device.lightsOff();
   res.send('lights off');
});

// route: {{url}}/Device/fan/on
router.put('/fan/on', (req, res) => {
   device.fanOn();
   res.send('fans on');
});

// route: {{url}}/Device/fan/off
router.put('/fan/off', (req, res) => {
   device.fanOff();
   res.send('fans off');
});

module.exports = router;
