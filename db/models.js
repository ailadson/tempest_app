var DataTypes = require('sequelize').DataTypes;
var db = require('./db_connection');

const Doctor = db.define('doctor', {
  id : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  emailAddress: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
});


const Patient = db.define('patient', {
  id : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  emailAddress: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  mailingAddress: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.STRING
  }
});

const Appointment = db.define('appointment', {
  id : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  date: {
    type: DataTypes.STRING
  },
  time: {
    type: DataTypes.STRING
  },
  purpose: {
    type: DataTypes.STRING
  },
  declineReason: {
    type: DataTypes.STRING
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

const File = db.define('file', {
  id : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  date: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  }
});

Doctor.hasMany(Appointment);
Patient.hasMany(Appointment);
Doctor.hasMany(File);
Patient.hasMany(File);

module.exports = {
  Doctor, Patient, Appointment, File
}
