module.exports = function(db, DataTypes) {
  let File = db.define('file', {
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
  return File;
}
