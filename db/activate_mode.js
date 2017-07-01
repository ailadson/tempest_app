const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, "config.json")

module.exports = function(bool){
  let config = JSON.parse(fs.readFileSync(filename, 'utf8'));
  config.testing = bool;

  fs.writeFile(filename, JSON.stringify(config), ()=>{
    console.log("Running Test Database: " + config.testing);
  });
}
