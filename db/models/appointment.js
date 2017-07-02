module.exports = function(db, DataTypes) {
  let Appointment = db.define('appointment', {
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
  return Appointment;
}
