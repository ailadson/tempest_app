const DataTypes = require('sequelize').DataTypes;
const fs = require('fs');
const path = require('path')

let { testing } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "config.json"), 'utf8')
);
let db = require('../db_connection')(testing ? "test" : "db");

function defineModels(db) {
  let Doctor = require('./doctor')(db, DataTypes);
  let Patient = require('./patient')(db, DataTypes);
  let Appointment = require('./appointment')(db, DataTypes);
  let File = require('./file')(db, DataTypes);

  Doctor.hasMany(Appointment);
  Patient.hasMany(Appointment);
  Doctor.hasMany(File);
  Patient.hasMany(File);

  return {
    Doctor, Patient, Appointment, File
  };
}

module.exports = function() { return defineModels(db); }
