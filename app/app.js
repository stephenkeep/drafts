var util = require('util'),
    App = require(__base + 'core/app'),
    UI = require(__base + 'core/frameworks/uikit'),
    RootViewController = require(__base + 'app/viewControllers/compose/controllers/rootViewController'),
    DocumentListViewController = require(__base + 'app/viewControllers/compose/controllers/documentListViewController'),
    ComposeViewController = require(__base + 'app/viewControllers/compose/controllers/composeViewController');

function app() {
    App.apply(this, arguments);
}

util.inherits(app, App);

app.prototype.appDidFinishLauncing = function () {
    console.log('applicationDidFinishLaunching');
    
    var rootViewController = new RootViewController(),
        documentListViewController = new DocumentListViewController(),
        composeViewController = new ComposeViewController(),
        navigationViewController = new UI.NavigationViewController();
    
    navigationViewController.setRootViewController(documentListViewController);

    //set split screen widths
    navigationViewController.view.width = '280px';
    composeViewController.view.width = '-webkit-calc(100% - 280px)';
    
    rootViewController.setLeftViewController(navigationViewController);
    rootViewController.setRightViewController(composeViewController);

    this.setRootViewController(rootViewController);
};


module.exports = app;