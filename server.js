const express = require('express');
const http = require('http');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(3000, function(){
    console.log('Server running on 3000...');
});
