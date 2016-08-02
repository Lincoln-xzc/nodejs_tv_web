/**
 * Created by Lincoln on 2016/7/25.
 */
var mysql = require('mysql');
var conf = require('../config.js');
var util = require('util');
var uuid = require('node-uuid');

var conn = mysql.createConnection(conf);
   conn.connect();
function Table(sql, util, fields, values){
    this.sql = sql;
    this.util = util;
    this.fields = fields;
    this.values = values;
}

//添加
Table.prototype.insert = function(sql, values, callback){

    console.log('连接成功');
    if(!callback){
        callback = function(){};
    }
    if(typeof values["id"]=='underfined'||values["id"]==null || values["id"]===""){
        values["id"]=uuid.v1();
    }

    conn.query(sql, values, function(err, result){
        if(err){
            console.log(err);
        } else {
            var result = {
                'Msg': '添加成功',
                'data': {
                 'id':values['id']
                },
                'success':true
            }
            callback(result);
        }
    })


}
//删除
Table.prototype.remove = function(sql,ID,callback){

    if(!callback){
        callback = function(){};
    }
    conn.query(sql,ID, function(err, result){
        if(err){
            console.log(err);
        } else {
            callback(result);
        }
    })

}
//更新
Table.prototype.update = function(sql, values, callback){

    if(!callback){
        callback = function(){};
    }
    conn.query(sql+conn.escape(values.id), values, function(err, result){
        if(err){
            console.log(err);
        } else {
            callback(result);
        }
    })

}
//查询
Table.prototype.select = function(sql, callback){
   // var pool = createPool();

    console.log('连接成功');
    if(!callback){
        callback = function(){};
    }
    conn.query(sql, function(err, results, fields){
        if(err){
            throw err;
        } else {
            callback(results);
        }
    })


 /*  pool.getConnection(function(err, conn){
        if(err) console.log('pool==>'+err);
        conn.query(sql, function(err, result){
            if(err){
                console.log(err);
            } else {
                callback(result);
            }

            conn.release();
        })
    })*/
}

//find by Name
Table.prototype.findByCondition = function(sql, value, callback){

    if(!callback){
        callback = function(){};
    }
    console.log('连接成功');
    conn.query(sql,value, function(err,result){
        if(err){
            throw err;
        } else {
            var data = {
                'msg':'查询成功',
                'data': result,
                'success': true
            }
            callback(data);
        }
    });

}

module.exports = Table;




