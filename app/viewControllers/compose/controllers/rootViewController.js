var UI = require(__base + 'core/frameworks/uikit');

function RootViewController() {
    UI.SplitViewController.apply(this, arguments);
}

UI.inherits(RootViewController, UI.SplitViewController);

module.exports = RootViewController;