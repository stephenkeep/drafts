var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController'),
    NavigationView = require(root + 'views/navigationView'),
    NavigationBar = require(root + 'views/navigationBar');

function NavigationViewController() {
    ViewController.apply(this, arguments); 
    this.view = new NavigationView();
}

util.inherits(NavigationViewController, ViewController);

NavigationViewController.prototype.setRootViewController = function (viewController) {
    this.rootViewController = viewController;
    this.rootViewController.view.element.style.display = 'flex';
    this.rootViewController.view.element.style.flexDirection = 'column';
    
    this.rootViewController.navigationBar = new NavigationBar();
    this.rootViewController.navigationBar.title = this.rootViewController.title;
    this.rootViewController.view.appendChild(this.rootViewController.navigationBar);
    
    this.view.appendChild(this.rootViewController.view);
    
    this.rootViewController.parentViewController = this;
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

module.exports = NavigationViewController;