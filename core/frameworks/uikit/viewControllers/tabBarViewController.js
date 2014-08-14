var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController'),
    View = require(root + 'views/view'),
    TabView = require(root + 'views/tabView'),
    TabBar = require(root + 'views/tabBar'),
    TabBarButton = require(root + 'views/tabBarButton');

function TabBarViewController() {
    ViewController.apply(this, arguments);
    this.parentViewController = this;
    this.view = new TabView();
    
    this.selectedIndex = 0;
    this.zindex = 10000;
    
    this.tabBar = new TabBar();
    this.view.appendChild(this.tabBar);
    
    this.viewControllerContainer = new View();
    this.viewControllerContainer.height = '-webkit-calc(100% - ' + this.tabBar.height + ')';
    this.view.appendChild(this.viewControllerContainer);
    
    this.viewControllers = [];
    this.tabBarButtons = [];
}

util.inherits(TabBarViewController, ViewController);

TabBarViewController.prototype.addViewController = function (viewController) {
    
    var zindex = this.zindex - this.viewControllers.length;
    
    this.viewControllers.push(viewController);
    viewController.view.element.style.position = 'absolute';
    viewController.view.element.style.top = '0px';
    viewController.view.element.style.left = '0px';
    viewController.view.element.style.zIndex = zindex;
    this.viewControllerContainer.appendChild(viewController.view);
    
    var tabBarButton = new TabBarButton();
    tabBarButton.text = viewController.title;
    tabBarButton.tabBarViewController = this;
    tabBarButton.index = this.viewControllers.length - 1;
    tabBarButton.backgroundColor = this.tabBar.backgroundColor;
    tabBarButton.textColor = this.tabBar.textColor;
    if (this.tabBarButtons.length === 0) {
        tabBarButton.selected = true;
    } else {
        tabBarButton.selected = false;
    }
    this.tabBar.appendChild(tabBarButton);
    this.tabBarButtons.push(tabBarButton);
};

TabBarViewController.prototype.didPressTabBarButton = function (tabBarButton) {
    
    var selectedIndex = tabBarButton.index;
    
    
    if (selectedIndex !== this.selectedIndex) {
        
        this.selectedIndex = selectedIndex;
        var i = 0, l = 0;
        //reorder the z-index on the viewControllers
        for (i = 0, l = this.viewControllers.length; i < l; i++) {

            var zindex = this.zindex - (i + 1);
            var vc = this.viewControllers[i];
        
            if (i === selectedIndex) {
                
                vc.view.element.style.zIndex = zindex + l + 1; 
                
            } else if (vc.view.element.style.zIndex !== zindex) {
                
                vc.view.element.style.zIndex = zindex;     
            }
        }
        
        //set the correct selected tabbarbutton
        for (i = 0, l = this.tabBarButtons.length; i < l; i++) {
            var tb = this.tabBarButtons[i];
            if (tb.selected) {
                tb.selected = false;
            }
        }
        tabBarButton.selected = true;
    }
};

module.exports = TabBarViewController;