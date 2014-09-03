var util = require('util'),
    App = require('core/app'),
    UI = require('core/frameworks/uikit'),
    ActivityListViewController = require('./viewControllers/activityListViewController');

function app() {
    App.apply(this, arguments);
}

util.inherits(app, App);

app.prototype.appDidFinishLauncing = function () {
    
    var activityListViewController = new ActivityListViewController(),
        navigationViewController = new UI.NavigationViewController();
    
    navigationViewController.setRootViewController(activityListViewController);
    
    this.setRootViewController(navigationViewController);
    
    navigationViewController.navigationBar.borderColor = 'rgb(213, 213, 213)';
    navigationViewController.navigationBar.titleLabel.textColor = '#ffffff';
    navigationViewController.navigationBar.backgroundColor = '#d46931';
     
    activityListViewController = null;
};

module.exports = app;