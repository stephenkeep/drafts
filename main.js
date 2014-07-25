global.__base = __dirname + '/';
global.document = window.document;

var app = require('./app/app.js');
app.appWillFinishLaunching();