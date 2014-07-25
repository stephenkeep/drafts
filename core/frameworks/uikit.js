var root = __base + 'core/frameworks/uikit/',
    Model = require(root + 'models/model');

require(root + 'shim/Object.prototype.watch');
    
var View = require(root + 'views/view'),
    BarButton = require(root + 'views/barButton'),
    Label = require(root + 'views/label'),
    NavigationBar = require(root + 'views/navigationBar');

var ViewController = require(root + 'viewControllers/viewController');

module.exports = {
	name: 'uikit',
    Model: Model,
    View: View,
    BarButton: BarButton,
    Label: Label,
    NavigationBar: NavigationBar,
    ViewController: ViewController
};