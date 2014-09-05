var UI = require('core/frameworks/uikit');

function ActivityViewController() {
    UI.ViewController.apply(this, arguments);
}

UI.inherits(ActivityViewController, UI.ViewController);

var _prototype = ActivityViewController.prototype,
    _super = ActivityViewController.super_.prototype;

_prototype.viewDidLoad = function () {
    _super.viewDidLoad.call(this); 
};

_prototype.viewDidUnload = function () {
    _super.viewDidUnload.call(this); 
};

module.exports = ActivityViewController;