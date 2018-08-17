const express = require('express');
const router = express.Router();
const content = require('../../libs/schema');

router.get('/', function (req, res, next) {
  res.render('docs', {
    title: "work-DOCS",
    length: 50
  });
});

router.get('/:id', function (req, res, next) {
  content.findOne({_id : req.params.id}, (err, content) => {
    if (err) return console.error(err);
    console.log("//////" + content);
    res.render('docs', {
      title: "Document",
      data: content
    });
  });
});

module.exports = router;