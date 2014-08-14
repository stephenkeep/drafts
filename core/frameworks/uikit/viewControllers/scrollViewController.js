var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController'),
    ScrollView = require(root + 'views/scrollView');

function ScrollViewController() {
    ViewController.apply(this, arguments); 
    this.view = new ScrollView();
    this.parentViewController = this;
}

util.inherits(ScrollViewController, ViewController);

module.exports = ScrollViewController;