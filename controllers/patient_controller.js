const storage = require('../cloud_storage');
const models = require('../db/models')();


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

module.exports = {
  all : function(req, res) {
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
  },

  createFile : function(req, res) {
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
  },

  destroyFile : function(req, res) {
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
  },

  createAppointment : function(req, res) {
    getPatientFromId(req.body.studentID, patient => {
      patient.createAppointment(req.body.appointment).then(() => {
        getPatientFromId(req.body.studentID, patient => {
          res.json(patient.dataValues);
        });
      });
    });
  },

  destroyAppointment : function (req, res) {
    let appointment = req.body.appointment;
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
  },

  updateAppointment : function (req, res) {
    let { appointment } = req.body;

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
  }
};
