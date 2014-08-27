var View = require('./uikit/views/view'),
    ScrollView = require('./uikit/views/scrollView'),
    BarButton = require('./uikit/views/barButton'),
    Label = require('./uikit/views/label'),
    NavigationBar = require('./uikit/views/navigationBar'),
    CollectionCell = require('./uikit/views/collectionCell'),
    Button = require('./uikit/views/button');

    document.registerElement('ui-view');
    document.registerElement('ui-scrollview');
    document.registerElement('ui-barbutton');
    document.registerElement('ui-button');
    document.registerElement('ui-collectioncell');
    document.registerElement('ui-label');
    document.registerElement('ui-navigationbar');
    document.registerElement('ui-navigationview');

var ViewController = require('./uikit/viewControllers/viewController'),
    ScrollViewController = require('./uikit/viewControllers/scrollViewController'),
    SplitViewController = require('./uikit/viewControllers/splitViewController'),
    CollectionViewController = require('./uikit/viewControllers/collectionViewController'),
    NavigationViewController = require('./uikit/viewControllers/navigationViewController'),
    ModalViewController = require('./uikit/viewControllers/modalViewController'),
    TabBarViewController = require('./uikit/viewControllers/tabBarViewController'),
    PopOverViewController = require('./uikit/viewControllers/popOverViewController');

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
    ModalViewController: ModalViewController,
    TabBarViewController: TabBarViewController,
    PopOverViewController: PopOverViewController
};