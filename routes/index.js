var express = require('express');
var router = express.Router();
var DB = require('../models/db.js');
/* GET home page. */
router.get('/index', function(req, res, next) {
  var db = new DB();
  var selectSql = 'select * from user';
  db.select(selectSql, function(result){
      res.json(result);
  })
 /*db.select(selectSql, function(result){
   console.log('aaas');
 })*/
});

module.exports = router;
