var UI = require('core/frameworks/uikit');

function ComposeViewController() {
    UI.ScrollViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
}

UI.inherits(ComposeViewController, UI.ScrollViewController);

module.exports = ComposeViewController;