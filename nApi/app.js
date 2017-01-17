const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
const app = express()
const router = express.Router()
var we = require('./models/libs.js');

const uuidV4 = require('uuid/v4');
var uuid = uuidV4();
console.log("UUID:", uuid);
we.uuid = uuid;

app.use(cookieParser(uuid, {
  maxAge: 60 * 60 * 24 * 7
}))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// load api - .../api/v1
var models = require("./models/customer.js");
app.use(models);

// 模板
app.engine('html', cons.swig)
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// 静态目录
app.use(express.static('public'));

// admin ui
var admin = require('./router/admin');
var dashboard = require('./router/dashboard');

// 设定路由
app.use('/', admin);
app.use('/dashboard', dashboard);

app.listen(3000, () => {
  console.log("Server Port:", '3000')
})
