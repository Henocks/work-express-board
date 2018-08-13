/* express configure */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs")
const dbconn = require('./libs/dbconn');
const content = require('./libs/schema');

dbconn.init(mongoose);
const db = mongoose.connection;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/create', require('./routes/create'));
app.use('/delete', require('./routes/delete'));
app.use('/documents', require('./routes/document'));
app.use('/list', require('./routes/list'));

app.get('/', (req,res) => {
  res.render('index', {
      title: "work-board",
      length: 50
  });
});

app.get('/setup', (req, res) => {
  db.on('error', console.error.bind(console, 'connection error!'));
  db.once('open', function () {
    console.log('connection succesful');
  })
  res.send("conn done");
});

app.listen(3000, function () {
  console.log("localhost:3000 Listening!");
});