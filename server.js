/*
 * SERVER.JS
 */

require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// modules 
var config = require('./config')
  , express = require('express')
  , app = express()
  , resources = require('./resources')
  , path = require('path')
  , bodyParser = require('body-parser')
  , flash = require('connect-flash')
  , cors = require('cors')
  , logger = require('morgan')
  , server = app.listen(config.port)
  , mongoose  = require('mongoose')

//configuration

//config files 
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mean-auth-html'
);

app.use("/", express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(logger('dev'));
app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var ejs = require('ejs');
app.engine('html', ejs.renderFile); 
app.set('view engine', 'html');

// RESOURCES
app.get('/', resources.index);
app.get('/templates/:name', resources.templates);
// app.post('/api/events', function(req, res) {
//   console.log(req.body);
// })

require('./resources/users')(app);
require('./resources/events')(app);



// redirect all others to the index (HTML5 history)
app.get('*', resources.index);

// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var port = process.env.port || 1337;

// var server = require('http').createServer(app);
// server = server.listen(port);


app.listen((process.env.PORT || 1337),function() {
  console.log("The server is running");
}

module.exports = server;
console.log('server running at http://localhost:' + config.port);


