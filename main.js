var attachFastClick = require('fastclick');
attachFastClick(document.body);

var App = require('./app/app.js'),
    app = new App();

app.appWillFinishLaunching();