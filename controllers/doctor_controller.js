var models = require('../db/models');

var DoctorController = {};

DoctorController.all = function(req, res) {
  models.Doctor.findAll().then(doctors => {
    doctors = doctors.map(d => d.dataValues);
    res.json(doctors);
  });
};

module.exports = DoctorController;
