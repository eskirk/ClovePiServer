var express = require('express');
var router = express.Router({caseSensitive: true});
var async = require('async');

const device = require('../../device/device');

router.baseUrl = '/Device';

// route: /Device
router.get('/', (req, res) => {
   res.send(device.name);
});

// route: /Device/stats
router.get('/stats', (req, res) => {
   res.send(device.stats);
});

// route: /Device/off
router.put('/off', (req, res) => {
   device.off();
   res.send('device powering off');
});

// route: /Device/pressurize
router.put('/pressurize', (req, res) => {
   device.pressurize();
   res.send('device pressurizing');
});

// route: /Device/depressurize
router.put('/pressurize', (req, res) => {
   device.depressurize();
   res.send('device depressurizing');
});

module.exports = router;
