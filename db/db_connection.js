var path = require('path');
var Sequelize = require('sequelize');

function getDB(file){
  const sequelize = new Sequelize('database', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    storage: path.join(__dirname, `${file}.sqlite`)
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  return sequelize;
}

module.exports = getDB;
