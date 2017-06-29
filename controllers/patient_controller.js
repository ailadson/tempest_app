var db = require('../db/util');
var storage = require('../cloud_storage');

var PatientController = {};

PatientController.all = function(req, res) {
  var patients = db.Patients.all();
  res.end(JSON.stringify(patients));
};

PatientController.createFile = function(req, res) {
  var patients = db.Patients.all();
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  storage.upload(req.body.file.filedata, function(result) {
    patient.files.push({ url : result.url, name : req.body.file.name, date: new Date() });
    db.Patients.save(patients, function(){
      res.end(JSON.stringify(patient));
    });
  });
};

PatientController.destroyFile = function(req, res) {
  var patients = db.Patients.all();
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  var fileIdx = patient.files.findIndex(f => (f.url === req.body.file.url));
  delete patient.files[fileIdx];
  patient.files = patient.files.filter(f => f);
  db.Patients.save(patients, function(){
    res.end(JSON.stringify(patient));
  });
};

PatientController.createAppointment = function(req, res) {
  var patients = db.Patients.all();
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  patient.appointments.push(req.body.appointment);
  db.Patients.save(patients, function(){
    res.end(JSON.stringify(patient));
  });
}

PatientController.destroyAppointment = function (req, res) {
  var appointment = req.body.appointment;
  var patients = db.Patients.all();
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  var appointmentIdx = patient.appointments.findIndex(a => (
    a.purpose === appointment.purpose && a.date === appointment.date
  ));
  delete patient.appointments[appointmentIdx];
  patient.appointments = patient.appointments.filter(a => a);
  db.Patients.save(patients, function(){
    res.end(JSON.stringify(patient));
  });
};

PatientController.declineAppointment = function (req, res) {
  var patients = db.Patients.all();
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  appointment = patient.appointments.find(appointment => (
    appointment.purpose === req.body.purpose && appointment.date === req.body.date
  ));
  appointment.declineReason = req.body.declineReason;
  db.Patients.save(patients, function(){
    res.end(JSON.stringify(patient));
  });
};

module.exports = PatientController;
