var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path')
var bodyParser = require('body-parser')

var app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json() );


app.all('/api/*', function(req, res, next) {
  res.type('json');
  next()
});

app.post('/api/login', function (req, res) {
  var doctors = fs.readFileSync(path.join(__dirname, 'db', 'doctors.json'), 'utf8');
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');

  res.end(doctors);
});

app.get('/api/patients', function (req, res) {
  var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'), 'utf8');
  res.end(patients);
});

app.get('/*', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(3000, function(){
    console.log('Server running on 3000...');
});
