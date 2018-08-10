const express = require('express');
const dbconn = require('./libs/dbconn');
const content = require('./libs/schema');

const app = express();
const mongoose = require('mongoose');
dbconn.init(mongoose);

const db = mongoose.connection;

app.get('/', function (req, res) {
  content.find(function(err, contents){
    if(err) return console.error(err);
    console.log(contents);
    let page = '';
    let counter = 0;
    contents.forEach(function(item){
      page = page + '<br \> <tr> <td class="number">'+counter+'</td> <td class="title"><a href="/">'+item.title+'</a></td> <td class="writer">'+item.writer+'</td><td class="date">'+item.date+'</td><td class="cnt">'+item.count+'</td></tr>'
      counter++;
    });
    res.send(page);
  });
});

app.get('/setUp', function (req, res) {
  db.on('error', console.error.bind(console, 'connection error!'));
  db.once('open', function(){
    console.log('connection succesful');
  })
  res.send("conn done");
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
    res.send(contents[0]);
  });
});

app.listen(3000, function(){
	console.log("localhost:3000 Listening!");
})