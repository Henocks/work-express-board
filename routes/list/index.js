const express = require('express');
const router = express.Router();
const content = require('../../libs/schema');

router.get('/', function (req, res, next) {
  content.find(function (err, contents) {
    if (err) return console.error(err);
    console.log(contents);
    res.render('list', {
      title: "List",
      list: contents
    });
  });
});

router.get('/:page', function (req, res, next) {
  res.send('PAGE : ' + req.params.id);
});

module.exports = router;