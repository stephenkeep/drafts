global.__base = __dirname + '/';
global.document = window.document;

var App = require('./app/app.js'),
    app = new App();

app.appWillFinishLaunching();