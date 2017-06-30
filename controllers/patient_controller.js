var storage = require('../cloud_storage');
var models = require('../db/models');

var PatientController = {};

function getPatientFromId(id, cb) {
  models.Patient.findOne({
    where : {
      id : id
    },
    include: [{
      model : models.Appointment, as : "appointments"
    }, {
      model : models.File, as : "files"
    }]
  }).then(cb);
}

PatientController.all = function(req, res) {
  models.Patient.findAll({
    include : [{
      model : models.Appointment, as : "appointments"
    }, {
      model : models.File, as : "files"
    }]
  }).then(patients => {
    patients = patients.map(p => p.dataValues)
    res.json(patients);
  });
};

PatientController.createFile = function(req, res) {
  getPatientFromId(req.body.studentID, patient => {
    storage.upload(req.body.file.filedata, function(result) {
      patient.createFile({
        url : result.url,
        name : req.body.file.name,
        date : new Date().toDateString()
      }).then(() => {
        getPatientFromId(req.body.studentID, patient => {
          res.json(patient.dataValues);
        });
      });
    });
  });
};

PatientController.destroyFile = function(req, res) {
  models.File.findOne({
    patientId : req.body.studentID,
    url : req.body.file.url
  }).then(file => {
    file.destroy().then(() => {
      getPatientFromId(req.body.studentID, patient => {
        res.json(patient.dataValues);
      });
    });
  });
};

PatientController.createAppointment = function(req, res) {
  getPatientFromId(req.body.studentID, patient => {
    patient.createAppointment(req.body.appointment).then(() => {
      getPatientFromId(req.body.studentID, patient => {
        res.json(patient.dataValues);
      });
    });
  });
}

PatientController.destroyAppointment = function (req, res) {
  var appointment = req.body.appointment;
  models.Appointment.findOne({
    where : {
      patientId : req.body.studentID,
      purpose : appointment.purpose,
      date : appointment.date
    }
  }).then(appointment => {
    appointment.destroy().then(() => {
      getPatientFromId(req.body.studentID, patient => {
        res.json(patient.dataValues);
      });
    });
  });
};

PatientController.declineAppointment = function (req, res) {
  var { appointment } = req.body;

  models.Appointment.findOne({
    where : {
      id : appointment.id
    }
  }).then(result => {
    result.update(appointment).then(() => {
      getPatientFromId(req.body.patientId, patient => {
        res.json(patient.dataValues);
      });
    });
  });
};

module.exports = PatientController;
