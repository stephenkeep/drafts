var root = __base + 'core/frameworks/uikit/',
    Model = require(root + 'models/model');

require(root + 'shim/Object.prototype.watch');
    
var View = require(root + 'views/view'),
    BarButton = require(root + 'views/barButton'),
    Label = require(root + 'views/label'),
    NavigationBar = require(root + 'views/navigationBar'),
    CollectionCell = require(root + 'views/collectionCell');

var ViewController = require(root + 'viewControllers/viewController'),
    SplitViewController = require(root + 'viewControllers/splitViewController'),
    CollectionViewController = require(root + 'viewControllers/collectionViewController'),
    NavigationViewController = require(root + 'viewControllers/navigationViewController');

module.exports = {
	name: 'uikit',
    inherits: require('util').inherits,
    Model: Model,
    
    View: View,
    BarButton: BarButton,
    Label: Label,
    NavigationBar: NavigationBar,
    CollectionCell: CollectionCell,
    
    ViewController: ViewController,
    SplitViewController: SplitViewController,
    CollectionViewController: CollectionViewController,
    NavigationViewController: NavigationViewController
};