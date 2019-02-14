var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.user);
  res.render('index', {user: req.cookies.user});
});

module.exports = router;
