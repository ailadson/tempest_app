const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, "config.json")

let config = JSON.parse(fs.readFileSync(filename, 'utf8'));
config.testing = !config.testing;

fs.writeFile(filename, JSON.stringify(config), ()=>{
  console.log("DB Testing: " + config.testing);
});
