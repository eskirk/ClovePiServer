var Express = require('express');
var router = Express.router({caseSensitive: true});
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