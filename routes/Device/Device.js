var Express = require('express');
var router = Express.router({caseSensitive: true});
var async = require('async');

router.baseUrl = '/Device';

// route: /Device
router.get('/', (req, res) => {
   res.send('{deviceName}');
});

// route: /Device/stats
router.get('/stats', (req, res) => {
   res.send('{deviceStats}');
});