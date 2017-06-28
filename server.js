var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path')

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('api/login', function (req, res) {
  var doctors = fs.readFileSync(path.join(__dirname, 'db', 'doctors.json'));
  // var patients = fs.readFileSync(path.join(__dirname, 'db', 'patients.json'));
  res.write(doctors);
});

app.get('/*', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(3000, function(){
    console.log('Server running on 3000...');
});
