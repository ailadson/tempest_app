var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');

var app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));


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

app.post('/api/patients/file', function(req, res) {
  var secrets = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json'), 'utf8'));
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  patients = JSON.parse(patients);
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));

  cloudinary.config({
    cloud_name: secrets.cloud_name,
    api_key: secrets.api_key,
    api_secret: secrets.api_secret
  });

  cloudinary.uploader.upload(req.body.file.filedata, function(result) {
    console.log(result.url);
    patient.files.push({ url : result.url, name : req.body.file.name, date: new Date() });
    patients = JSON.stringify(patients);
    fs.writeFile(path.join(__dirname, 'db', 'patients.json'), patients, 'utf8', function(){
      res.end(JSON.stringify(patient));
    });
  });
});

app.delete('/api/patients/file', function(req, res) {
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  patients = JSON.parse(patients);
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  var fileIdx = patient.files.findIndex(f => (f.url === req.body.file.url));
  delete patient.files[fileIdx];
  patient.files = patient.files.filter(f => f);
  fs.writeFile(path.join(__dirname, 'db', 'patients.json'), patients, 'utf8', function(){
    res.end(JSON.stringify(patient));
  });
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
  });
});

app.delete('/api/patients/appointment', function(req, res) {
  var appointment = req.body.appointment;
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  patients = JSON.parse(patients);
  patient = patients.find(patient => (patient.id === parseInt(req.body.studentID)));
  var appointmentIdx = patient.appointments.findIndex(a => (
    a.purpose === appointment.purpose && a.date === appointment.date
  ));
  delete patient.appointments[appointmentIdx];
  patient.appointments = patient.appointments.filter(a => a);
  fs.writeFile(path.join(__dirname, 'db', 'patients.json'), patients, 'utf8', function(){
    res.end(JSON.stringify(patient));
  });
});

app.get('/*', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(3000, function(){
    console.log('Server running on 3000...');
});
