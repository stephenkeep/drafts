var root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js');

function ViewController() {
    this.name = 'viewController';
    this.view = new View();
    this.view.parentViewController = this;
}

module.exports = ViewController;