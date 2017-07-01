const fs = require('fs');
const path = require('path');

const SessionController = require('./controllers/session_controller');
const PatientController = require('./controllers/patient_controller');
const DoctorController = require('./controllers/doctor_controller');

module.exports = function (app){
    app.route('/api/login')
      .post((req, res) => SessionController.create(req, res))
      .delete((req, res) => SessionController.destroy(req, res));

    app.route('/api/login/current')
      .get((req, res) => SessionController.fetchCurrent(req, res));

    app.route('/api/patients')
      .get((req, res) => PatientController.all(req, res));

    app.route('/api/patients/file')
      .post((req, res) => PatientController.createFile(req, res))
      .delete((req, res) => PatientController.destroyFile(req, res));

    app.route('/api/patients/appointment')
      .post((req, res) => PatientController.createAppointment(req, res))
      .patch((req, res) => PatientController.updateAppointment(req, res))
      .delete((req, res) => PatientController.destroyAppointment(req, res));

    app.route('/api/doctors')
      .get((req, res) => DoctorController.all(req, res));
};
