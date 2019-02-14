module.exports = (io) => {
  const express = require('express');
  var router = express.Router();
  const mongoose = require('mongoose');
  const Conference = mongoose.model('Conference');
  const date = require('../utils/dateFormat');
  const _ = require('lodash');

  router.get('/', function (req, res, next) {
    Conference.find({}, function (err, conferences) {
      return res.render('conferences/list', {user: req.cookies.user, conferences: conferences, _: require('lodash')})
    });
  });

  router.get('/new', function (req, res, next) {
    return res.render('conferences/new')
  });

  router.post('/new', function (req, res, next) {
    var converted = date.formatDate(req.body.date, req.body.start, req.body.end);

    var conf = new Conference({
      name: req.body.name,
      start: converted.start,
      end: converted.end
    });

    console.log(conf);

    conf.save();
    res.redirect('/conferences/')
  });

  router.get('/attend/:id', function (req, res, next) {
    Conference.findOne({_id: req.params.id}, function (err, conf) {
      if (err) {
        return res.render('/conferences/', {error: "Une erreur est survenue"});
      }

      conf.attendees.push(req.cookies.user);
      conf.save();

      return res.redirect('/conferences/')
    })
  });

  router.get('/:id', function (req, res, next) {
    res.render('conferences/view');

    var id = req.params.id;
    var user = req.cookies.user;

    io.on('connection', function (socket) {
      socket.join(id);

      io.to(id).emit('user connected', user.username)
    })
  });

  return router;
};
