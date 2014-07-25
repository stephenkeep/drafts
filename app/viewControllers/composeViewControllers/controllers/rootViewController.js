var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    SplitViewController = require(root + 'viewControllers/splitViewController.js');

function RootViewController() {
    SplitViewController.apply(this, arguments);
}

util.inherits(RootViewController, SplitViewController);

module.exports = RootViewController;