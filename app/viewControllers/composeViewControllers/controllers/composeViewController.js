var util = require('util'),
    UI = require(__base + 'core/frameworks/uikit');

function ComposeViewController() {
    UI.ViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
    this.view.width = '-webkit-calc(100% - 280px)';
}

util.inherits(ComposeViewController, UI.ViewController);

module.exports = ComposeViewController;