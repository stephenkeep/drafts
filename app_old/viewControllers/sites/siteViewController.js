var UI = require('core/frameworks/uikit');

function SiteViewController() {
    UI.ViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
}

UI.inherits(SiteViewController, UI.ViewController);



module.exports = SiteViewController;