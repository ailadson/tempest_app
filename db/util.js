var fs = require('fs');
var path = require('path');

function save(data, filename, cb) {
  data = JSON.stringify(data);
  fs.writeFile(path.join(__dirname, filename), data, 'utf8', function(){
    cb(data);
  });
}

module.exports = {
  Doctors : {
    all : function() {
      return(
        JSON.parse(
          fs.readFileSync(path.join(__dirname, 'doctors.json'), 'utf8')
        )
      );
    },
    save : function(data, cb) {
      save(data, 'doctors.json', cb);
    }
  },

  Patients : {
    all : function() {
      return(
        JSON.parse(
          fs.readFileSync(path.join(__dirname, 'patients.json'), 'utf8')
        )
      )
    },
    save : function(data, cb) {
      save(data, 'patients.json', cb);
    }
  }
}
