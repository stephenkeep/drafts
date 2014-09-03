var UI = require('core/frameworks/uikit');

function PageViewController() {
    UI.ViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
}

UI.inherits(PageViewController, UI.ViewController);



module.exports = PageViewController;