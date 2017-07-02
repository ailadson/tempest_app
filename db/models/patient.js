module.exports = function(db, DataTypes) {
  let Patient = db.define('patient', {
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
  return Patient;
}
