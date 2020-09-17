var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session'); //  session
// const FileStore = require('session-file-store')(session); // session持久化中间件

var dbConnect = require('./database/config');
var MongoStore = require('connect-mongo')(session);

var app = express();

var index = require('./controller/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({ limit: '4mb',extended: false }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'admin')));

// 创建 session 中间件
// const sessionMiddleware = session({
//   store:new FileStore(new MongoStore({ mongooseConnection: dbConnect })),//数据持久化方式，这里表示本地文件存储
//   secret: 'cpf_secret', // 签名密钥  加密key 可以随意书写
//   name: 'ssid',  // sessionID的名字
//   resave: false, //是否重新保存session
//   saveUninitialized: false,  //保存初始化
//   cookie: {
//     maxAge: 60000,//两次请求的时间差 即超过这个时间再去访问 session就会失效
//     secure: false,//是否是https协议
//     expires: 1000*60*60*24*14
//   }
// })

//sessionMiddleware
// app.use(sessionMiddleware);

app.use(session({
    name: 'cpf_sessionID',  // sessionID的名字
    secret: 'cpf_secret', // 签名密钥
    resave: false, //是否重新保存session
    saveUninitialized: false,  //保存初始化
    cookie: { secure: false,expires: 1000*60*60*24*14 }, //是否是https协议
    store: new MongoStore({ mongooseConnection: dbConnect })
}))

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
