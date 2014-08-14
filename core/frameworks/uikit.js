var root = __base + 'core/frameworks/uikit/';
   
var View = require(root + 'views/view'),
    ScrollView = require(root + 'views/scrollView'),
    BarButton = require(root + 'views/barButton'),
    Label = require(root + 'views/label'),
    NavigationBar = require(root + 'views/navigationBar'),
    CollectionCell = require(root + 'views/collectionCell'),
    Button = require(root + 'views/button');

    document.registerElement('ui-view');
    document.registerElement('ui-scrollview');
    document.registerElement('ui-barbutton');
    document.registerElement('ui-button');
    document.registerElement('ui-collectioncell');
    document.registerElement('ui-label');
    document.registerElement('ui-navigationbar');
    document.registerElement('ui-navigationview');

var ViewController = require(root + 'viewControllers/viewController'),
    ScrollViewController = require(root + 'viewControllers/scrollViewController'),
    SplitViewController = require(root + 'viewControllers/splitViewController'),
    CollectionViewController = require(root + 'viewControllers/collectionViewController'),
    NavigationViewController = require(root + 'viewControllers/navigationViewController'),
    TabBarViewController = require(root + 'viewControllers/tabBarViewController'),
    PopOverViewController = require(root + 'viewControllers/popOverViewController');

module.exports = {
	name: 'uikit',
    inherits: require('util').inherits,
    
    View: View,
    ScrollView: ScrollView,
    BarButton: BarButton,
    Label: Label,
    NavigationBar: NavigationBar,
    CollectionCell: CollectionCell,
    Button: Button,
    
    ViewController: ViewController,
    ScrollViewController: ScrollViewController,
    SplitViewController: SplitViewController,
    CollectionViewController: CollectionViewController,
    NavigationViewController: NavigationViewController,
    TabBarViewController: TabBarViewController,
    PopOverViewController: PopOverViewController
};