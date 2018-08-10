const express = require('express');
const dbconn = require('./libs/dbconn');

const app = express();
const mongoose = require('mongoose');
dbconn.init(mongoose);

app.get('/', function (req, res) {
  res.send("APIS RPC Broadcast server test page");
});


app.listen(3000, function(){
	console.log("localhost:3000 Listening!");
})