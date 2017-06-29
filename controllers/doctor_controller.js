var db = require('../db/util');

var DoctorController = {};

DoctorController.all = function(req, res) {
  var doctors = db.Doctors.all();
  doctors = doctors.map(d => ({ name : d.name, id : d.id }));
  res.end(JSON.stringify(doctors));
};

module.exports = DoctorController;
