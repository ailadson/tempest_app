const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const route = require('./routes');

let app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

app.all('/api/*', (req, res, next) => {
  res.type('json');
  next();
});

route(app);

app.get('/*',(req, res) => {
  res.render('index');
});

http.createServer(app).listen(3000, () => {
    console.log('Server running on 3000...');
});
