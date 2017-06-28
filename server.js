var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path')
var bodyParser = require('body-parser')

var app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all('/api/*', function(req, res, next) {
  res.type('json');
  next()
});

app.post('/api/login', function (req, res) {
  var doctors = fs.readFileSync(path.join(__dirname, 'db', 'doctors.json'), 'utf8');
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  var user = JSON.parse(doctors)[0];
  res.end(JSON.stringify(user));
});

app.get('/api/patients', function (req, res) {
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  res.end(patients);
});

app.get('/api/doctors', function (req, res) {
  var doctors = fs.readFileSync(path.join(__dirname, 'db', 'doctors.json'), 'utf8');
  doctors = JSON.parse(doctors).map(d => ({ name : d.name, id : d.id }));
  res.end(JSON.stringify(doctors));
});

app.post('/api/patients/appointment', function (req, res) {
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  patients = JSON.parse(patients);
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  patient.appointments.push(req.body.appointment);
  patients = JSON.stringify(patients);
  fs.writeFile(path.join(__dirname, 'db', 'patients.json'), patients, 'utf8', function(){
    res.end(JSON.stringify(patient));
  })
});

app.patch('/api/patients/appointment', function(req, res) {
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  patients = JSON.parse(patients);
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  appointment = patient.appointments.find(appointment => (
    appointment.purpose === req.body.purpose && appointment.date === req.body.date
  ));
  appointment.declineReason = req.body.declineReason;
  patients = JSON.stringify(patients);
  fs.writeFile(path.join(__dirname, 'db', 'patients.json'), patients, 'utf8', function(){
    res.end(JSON.stringify(patient));
  })
});

app.get('/*', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(3000, function(){
    console.log('Server running on 3000...');
});
