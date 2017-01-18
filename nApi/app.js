const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var cors = require('cors-express');

const app = express()
app.use(cookieParser());

const router = express.Router()

var we = require('./models/libs.js');

const uuidV4 = require('uuid/v4');
var uuid = uuidV4();
we.uuid = uuid;


app.use(cors(cors_options));
app.use(methodOverride('X-HTTP-Method-Override'))

var server = app.listen(3000, () => {
  console.log("")
  console.log("Server Port:", '3000')
})

//socket.io
var io = require('socket.io').listen(server);
app.use(function(req, res, next) {
  res.io = io;
  next();
});

// 設定跨域
var cors_options = {
  allow: {
    origin: '*',
    methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
  }
}

// 處理 json & from 請求
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

// load api - .../api/v1
var api = require("./models/api.js");
app.use(api.router);

// 模板
app.engine('html', cons.swig)
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// 静态目录
app.use(express.static('public'));

// admin ui
var admin = require('./router/admin');
var dashboard = require('./router/dashboard');
var user = require('./router/user');


// 设定路由
app.use('/', admin);
app.use('/dashboard', dashboard);
app.use('/user', user);

// open id
var wx = require('./router/wx');
app.use('/wx', wx); //交換 openid

module.exports = {
  app: app
};
