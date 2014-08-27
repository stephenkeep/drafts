var util = require('util'),
    ViewController = require('./viewController'),
    NavigationView = require('../views/navigationView'),
    NavigationBar = require('../views/navigationBar');

function NavigationViewController() {
    ViewController.apply(this, arguments); 
    this.view = new NavigationView();
    this.view.parentViewController = this;
    
    this.currentViewController = null;
}

util.inherits(NavigationViewController, ViewController);

NavigationViewController.prototype.setRootViewController = function (viewController) {
    this.rootViewController = viewController;
    this.rootViewController.view.element.style.display = '-webkit-flex';
    this.rootViewController.view.element.style.flexDirection = 'column';
    
    this.rootViewController.navigationBar = new NavigationBar();
    this.rootViewController.navigationBar.title = this.rootViewController.title;
    this.rootViewController.view.appendChild(this.rootViewController.navigationBar);
    
    this.view.appendChild(this.rootViewController.view);
    
    this.currentViewController = this.rootViewController;
    
    this.rootViewController.parentViewController = this;
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

NavigationViewController.prototype.viewWillAppear = function () {

    if (this.currentViewController && this.currentViewController.viewWillAppear) {
        this.currentViewController.viewWillAppear();    
    }
};

NavigationViewController.prototype.viewDidAppear = function () {

    if (this.currentViewController && this.currentViewController.viewDidAppear) {
        this.currentViewController.viewDidAppear();    
    }
};

module.exports = NavigationViewController;