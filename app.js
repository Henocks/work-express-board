const express = require('express');
const dbconn = require('./libs/dbconn');
const content = require('./libs/schema');

const app = express();
const mongoose = require('mongoose');
dbconn.init(mongoose);

const db = mongoose.connection;

app.get('/', function (req, res) {
  db.on('error', console.error.bind(console, 'connection error!'));
  db.once('open', function(){
    console.log('connection succesful');
  })
  res.send("test page");
});

app.get('/createPage', function (req, res) {
  const page = new content(
    {
      writer: "Haryun",
      password: "1234",
      title: "TestPageTitle",
      contents: "TestPageContent",
      comments: [{
          name: "Haryun2",
          memo: "HAHAHAHAHA"
      }]
    }
  );

  page.save(function(err){
    if(err) console.log(err);
  });

  

  content.find(function(err, contents){
    if(err) return console.error(err);
    console.log(contents);
    res.send(contents);
  })

  //res.send("TITLE : " + page.title);

});

app.get('/readPage', function (req, res) {

  content.find(function(err, contents){
    if(err) return console.error(err);
    console.log(contents);
    res.send(contents);
  })

  res.send(page);
  //res.send("TITLE : " + page.title);

});

app.listen(3000, function(){
	console.log("localhost:3000 Listening!");
})