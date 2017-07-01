const fs = require('fs');
const models = require('../db/models')();

var SessionController = {};

SessionController.create = function(req, res){
  var model = (req.query.type === 'doctor' ? models.Doctor : models.Patient);
  model.findOne({
    where: {
      emailAddress: req.body.user.emailAddress,
      password: req.body.user.password
    }
  }).then((user) => {
    if (user){
      res.cookie('userType', (req.query.type === 'doctor' ? 'doctor' : 'patient'))
      res.cookie('userId', user.id)
      res.status(200).json(user.toJSON());
    } else {
      res.status(401).json({ errors : ["Incorrect Username or Password"] })
    }
  });
};

SessionController.destroy = function(req, res) {
  res.clearCookie('userType');
  res.clearCookie('userId');
  res.json({ deleted : true })
};

SessionController.fetchCurrent = function(req, res) {
  var model = (req.cookies.userType  === 'doctor' ? models.Doctor : models.Patient);
  model.findOne({
    where : {
      id : req.cookies.userId
    }
  }).then(user => {
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(401).json({ errors : ["No Such User"] })
    }
  });
};

module.exports = SessionController;
