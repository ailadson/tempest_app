var db = require('../db/util');

var SessionController = {};

SessionController.create = function(req, res){
  var user;

  if (req.query.type === 'doctor'){
    var doctors = db.Doctors.all();
    user = doctors.find(doc => {
      return (
        doc.emailAddress === req.body.user.emailAddress && doc.password == req.body.user.password
      )
    });
  } else {
    var patients = db.Patients.all();
    user = patients.find(doc => (
      doc.emailAddress === req.body.user.emailAddress && doc.password == req.body.user.password
    ));
  }

  if (user){
    res.cookie('userType', (req.query.type === 'doctor' ? 'doctor' : 'patient'))
    res.cookie('userId', user.id)
    res.json(user);
  } else {
    res.status(401).json({ errors : ["Incorrect Username or Password"] })
  }
};

SessionController.destroy = function(req, res) {
  res.clearCookie('userType');
  res.clearCookie('userId');
  res.json({ deleted : true })
};

SessionController.fetchCurrent = function(req, res) {
  var user;

  if (req.cookies.userType === 'doctor') {
    var doctors = db.Doctors.all();
    user = doctors.find(doc => (doc.id == req.cookies.userId));
  } else if (req.cookies.userId == 'patient') {
    var patients = db.Patients.all();
    user = patients.find(patient => (patient.id == req.cookies.userId));
  }

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ errors : ["No User"] })
  }
};

module.exports = SessionController;
