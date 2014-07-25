var root = __base + 'core/frameworks/uikit/',
    Model = require(root + 'models/model');

require(root + 'shim/Object.prototype.watch');
    
var View = require(root + 'views/view'),
    Label = require(root + 'views/label'),
    NavigationBar = require(root + 'views/navigationBar');

var ViewController = require(root + 'viewControllers/viewController');

module.exports = {
	name: 'uikit',
    Model: Model,
    View: View,
    Label: Label,
    NavigationBar: NavigationBar,
    ViewController: ViewController
};