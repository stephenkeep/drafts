var attachFastClick = require('fastclick');
attachFastClick(document.body);

//Used in to polyfil registerElement
require('document-register-element');

var App = require('./app/app.js'),
    app = new App();

app.appWillFinishLaunching();