var fs = require('fs');
var path = require('path');
var cloudinary = require('cloudinary');
var secrets = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json'), 'utf8'));





module.exports = {
  upload : function(data, cb) {
    cloudinary.config({
      cloud_name: secrets.cloud_name,
      api_key: secrets.api_key,
      api_secret: secrets.api_secret
    });

    cloudinary.uploader.upload(data, function(result) {
      cb(result);
    });

  }
}
