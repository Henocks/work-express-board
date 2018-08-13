const express = require('express');
const router = express.Router();
const content = require('../../libs/schema');

let counter = 0;

router.get('/', function (req, res, next) {
  content.remove({_id : req.params.id}, function(err){
    res.redirect('/list');
  });
});

module.exports = router;