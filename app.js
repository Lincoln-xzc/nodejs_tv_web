var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

// /添加的
var session = require('express-session');

var fs = require('fs');
var ejs = require('ejs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('routes',__dirname + '/routes/'); //获取routes下的文件
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//添加的
app.use(session({
  secret:'xzc',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 6000*30}
}));

//控制层，根据routes文件名+方法—约定请求路径
/*app.use('/', routes);
app.use('/users', users);*/

var routes = app.get("routes");
fs.readdirSync(routes).forEach(function(fileName){
  var filePath = routes + fileName;
  var routerName = fileName.substr(0,fileName.lastIndexOf("."));

  if(!fs.lstatSync(filePath).isDirectory()){
    if(routerName === 'index'){
      app.use('/', require(filePath));
    } else {
      app.use('/api', require(filePath));
    }
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
