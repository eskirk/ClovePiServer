var express = require('express');
var router = express.Router({caseSensitive: true});
var async = require('async');

router.baseUrl = '/Users';

// route: /Users
router.get('/', (req, res) => {
   res.send('{listOfUsers}');
});

// route: /Users/{id}
router.get('/{id}', (req, res) => {
   res.send('{infoAboutUser}');
});

module.exports = router;