var express = require('express');
var router = express.Router();
var DB = require('../models/db.js');
var fs = require('fs');
/* GET home page. */
router.get('/index/:id', function(req, res, next) {
  var db = new DB();
  var selectSql = 'select * from movie_message where id = ?';
  var id = req.params.id;
  console.log(id);
  var values = [];
    values.push(id);
  db.findByCondition(selectSql, values, function(result){
      if(result.success){
          var data = result.data[0];
          console.log(data);
          fs.createReadStream(data.url).pipe(res);
      }
  })
 /*db.select(selectSql, function(result){
   console.log('aaas');
 })*/
});

/**/
router.post('/index', function(req, res, next){
    var db = new DB();
    var selectSql = 'select a.* from movie a left join movie_recommand b on a.id = b.movieId where b.recommand = ?';
    var values = [];
    var data = req.body;
    values.push(data.type);
    db.findByCondition(selectSql, values, function(result){
        res.json(result);
    })
});

module.exports = router;
