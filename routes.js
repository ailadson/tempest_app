var fs = require('fs');
var path = require('path');
var db = require('./db/util');
var storage = require('./cloud_storage');

module.exports = function (app){
    app.route('/api/login')
    .post(function (req, res) {
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

      console.log(req.query.type);
      if (user){
        res.cookie('userType', (req.query.type === 'doctor' ? 'doctor' : 'patient'))
        res.cookie('userId', user.id)
        res.json(user);
      } else {
        res.status(401).json({ errors : ["Incorrect Username or Password"] })
      }
    })
    .delete(function (req, res) {
      res.clearCookie('userType');
      res.clearCookie('userId');
      res.json({ deleted : true })
    });

    app.route('/api/login/current')
    .get(function(req, res) {
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
    });

    app.route('/api/patients')
    .get(function (req, res) {
      var patients = db.Patients.all();
      res.end(JSON.stringify(patients));
    });

    app.route('/api/doctors')
    .get(function (req, res) {
      var doctors = db.Doctors.all();
      doctors = doctors.map(d => ({ name : d.name, id : d.id }));
      res.end(JSON.stringify(doctors));
    });

    app.route('/api/patients/file')
    .post(function(req, res) {
      var patients = db.Patients.all();
      patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
      storage.upload(req.body.file.filedata, function(result) {
        patient.files.push({ url : result.url, name : req.body.file.name, date: new Date() });
        db.Patients.save(patients, function(){
          res.end(JSON.stringify(patient));
        });
      })
    })
    .delete(function(req, res) {
      var patients = db.Patients.all();
      patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
      var fileIdx = patient.files.findIndex(f => (f.url === req.body.file.url));
      delete patient.files[fileIdx];
      patient.files = patient.files.filter(f => f);
      db.Patients.save(patients, function(){
        res.end(JSON.stringify(patient));
      });
    });

    app.route('/api/patients/appointment')
    .post(function (req, res) {
      var patients = db.Patients.all();
      patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
      patient.appointments.push(req.body.appointment);
      db.Patients.save(patients, function(){
        res.end(JSON.stringify(patient));
      });
    })
    .patch(function(req, res) {
      var patients = db.Patients.all();
      patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
      appointment = patient.appointments.find(appointment => (
        appointment.purpose === req.body.purpose && appointment.date === req.body.date
      ));
      appointment.declineReason = req.body.declineReason;
      db.Patients.save(patients, function(){
        res.end(JSON.stringify(patient));
      });
    })
    .delete(function(req, res) {
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
    });

    app.route('/api/doctors')
    .get(function (req, res) {
      var doctors = db.Doctors.all();
      doctors = doctors.map(d => ({ name : d.name, id : d.id }));
      res.end(JSON.stringify(doctors));
    });
};
