var fs = require('fs');
var path = require('path');

var doctors = fs.readFileSync(path.join(__dirname, 'doctors_default.json'), 'utf8');
var patients = fs.readFileSync(path.join(__dirname, 'patients_default.json'), 'utf8');

fs.writeFile(path.join(__dirname, 'doctors.json'), doctors, 'utf8', function(){
  console.log("RESET DOCTORS");
});

fs.writeFile(path.join(__dirname, 'patients.json'), patients, 'utf8', function(){
  console.log("RESET PATIENTS");
});
