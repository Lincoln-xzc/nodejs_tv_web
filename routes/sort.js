/**
 * Created by Htmler on 2016/8/8.
 */
var express = require('express');
var router = express.Router();
var DB = require('../models/db.js');
var db = new DB();
router.get('/sort', function(req, res, next){
    res.send('连接成功');
});

//获取视频分类
router.post('/sort', function(req, res, next){
    var values = [];
    var data = req.body();
    var currentPageNum = (data.size-1) * data.currentPage;
    var lastPageNum = data.size * data.currentPage;
    values.push(data.type);
    values.push(data.tip);
    values.push(data.area);
    values.push(data.releaseDate);
    values.push(currentPageNum);
    values.push(lastPageNum);
    var sortPage = 'select * from movie where type = ? OR tip = ? OR area = ? OR releaseDate = ? ORDER BY id LIMIT ?, ?';
    db.findByCondition(sortPage, values, function(result){
        res.json(result);
    });
});
module.exports = router;
