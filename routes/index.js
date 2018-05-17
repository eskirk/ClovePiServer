var express = require('express');
var router = express.Router();

// route: {{url}}/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
