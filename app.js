const express = require('express');
const app = express();


app.get('/', function (req, res) {
  res.send("APIS RPC Broadcast server test page");
});


app.listen(3000, function(){
	console.log("localhost:3000 Listening!");
})