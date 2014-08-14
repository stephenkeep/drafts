var root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js');

function ViewController() {
    this.name = 'viewController';
    this.view = new View();
    
}

module.exports = ViewController;