var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController.js');

function SplitViewController() {
    ViewController.apply(this, arguments);  
}

util.inherits(SplitViewController, ViewController);

SplitViewController.prototype.setLeftViewController = function (viewController) {
    this.leftViewController = viewController;
    this.leftViewController.view.float = 'left';
    this.view.appendChild(this.leftViewController.view);
};

SplitViewController.prototype.setRightViewController = function (viewController) {
    this.rightViewController = viewController;
    this.rightViewController.view.float = 'left';
    this.view.appendChild(this.rightViewController.view);
};

module.exports = SplitViewController;