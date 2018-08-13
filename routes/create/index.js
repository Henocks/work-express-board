const express = require('express');
const router = express.Router();
const content = require('../../libs/schema');

let counter = 0;

router.get('/', function (req, res, next) {
  res.render('create', {});
});

function addBoard(title, writer, content, password){
  let newBoardContents = new content;
  newBoardContents.writer = writer;
  newBoardContents.title = title;
  newBoardContents.contents = content;
  newBoardContents.password = password;
  newBoardContents.count = counter++;
  newBoardContents.save(function (err) {
      if (err) throw err;
  });
}

router.post('/', function(req, res){
  // 글 작성하고 submit하게 되면 저장이 되는 부분
  const addNewTitle = req.body.addContentSubject;
  const addNewWriter = req.body.addContentWriter;
  const addNewContent = req.body.addContents;
  const addNewPasword = req.body.addContentPassword;
  addBoard(addNewTitle, addNewWriter, addNewContent, addNewPasword);
  res.redirect('/list');
});

module.exports = router;