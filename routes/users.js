var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = mongoose.model('User');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register', {user: req.cookies.user});
});

router.post('/register', function (req, res, next) {
  var user = new User(req.body);

  if (user.username === 'admin') {
    user.isAdmin = true
  }

  user.save();

  res.cookie('user', user.toJSON());
  return res.redirect('/');
});

router.get('/login', function (req, res, next) {
  res.render('users/login', {user: req.cookies.user});
});

router.post('/login', function (req, res, next) {
  User.findOne({username: req.body.username}, function (err, item) {
    if (err) {
      return res.render('users/login', {error: "Ce nom d'utilisateur n'existe pas.", user: req.cookies.user})
    }

    if (!item.verify(req.body.password)) {
      return res.render('users/login', {error: "Mot de passe incorrect.", user: req.cookies.user})
    }

    res.cookie('user', item.toJSON());
    return res.redirect('/');
  })
});

router.get('/disconnect', function (req, res, next) {
  res.clearCookie('user');
  return res.redirect('/')
});

module.exports = router;
