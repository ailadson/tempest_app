var models = require('../db/models')();

var DoctorController = {};

module.exports = {
  all : function(req, res) {
    models.Doctor.findAll().then(doctors => {
      doctors = doctors.map(d => d.dataValues);
      res.json(doctors);
    });
  }
};
