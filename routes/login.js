var express = require('express');
var router = express.Router();
var DB = require('../models/db.js');
/* GET home page. */
var db = new DB();
router.get('/login', function(req, res, next) {
   console.log('login');
});

router.post('/addUser', function(req, res, next){
   var insertSql = 'insert into user set ?';
    var user = req.body;
    console.log(user);
    db.insert(insertSql, user, function(result){
        res.json(result);
    })
});

router.post('/login', function(req, res, next){
    var selectSql = 'select * from user where name=? and password = ?';
    var user = [];
    user.push(req.body.name);
    user.push(req.body.password);
    db.findByCondition(selectSql, user,function(result){
        res.json(result);
    })
});

module.exports = router;
