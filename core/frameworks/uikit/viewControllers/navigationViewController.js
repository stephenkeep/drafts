var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController'),
    NavigationView = require('../views/navigationView'),
    NavigationBar = require('../views/navigationBar');

function NavigationViewController() {
    ViewController.apply(this, arguments); 
    this.view = new NavigationView();
    this.view.parentViewController = this;
    
    this.currentViewController = null;
    
    if (window.iOS) {
        this.statusBar = new View();
        this.statusBar.element.style.zIndex = '1001';
        this.statusBar.height = '20px';
        this.statusBar.backgroundColor = '#d46931';
        this.view.appendChild(this.statusBar);
    }
    
    this.navigationBar = new NavigationBar();
    this.navigationBar.element.style.zIndex = '1000';
    
    this.controllerView = new View();
    this.controllerView.element.style.flex = '1';
    
    this.view.appendChild(this.navigationBar);
    this.view.appendChild(this.controllerView);
    
    // create an observer instance
    this.observer = new window.MutationObserver(this.viewMutated.bind(this));
    this.observer.observe(this.controllerView.element, { childList: true });
}

util.inherits(NavigationViewController, ViewController);

NavigationViewController.prototype.viewMutated = function(mutations) {
    
    var self = this;

    mutations.forEach(function(mutation) {
        
        console.log(mutation);

        if (mutation.addedNodes !== null && 
            mutation.addedNodes.length > 0 && 
            mutation.addedNodes[0].parentView && 
            mutation.addedNodes[0].parentView.parentViewController) {

            var viewController = mutation.addedNodes[0].parentView.parentViewController;
            if (viewController.viewWillAppear) {
                viewController.viewWillAppear();    
            }
             
            if (viewController === this.rootViewController) {
                if (viewController.viewDidAppear) {
                    viewController.viewDidAppear();    
                }
            }
            
            self.observer.disconnect();
            self.observer = null;
        }
    });    
};

NavigationViewController.prototype.setRootViewController = function (viewController) {
        
    this.rootViewController = viewController;
    this.rootViewController.view.element.style.position = 'absolute';
    this.navigationBar.title = this.rootViewController.title;
    this.rootViewController.navigationBar = this.navigationBar;
    this.controllerView.appendChild(this.rootViewController.view);
    
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

NavigationViewController.prototype.viewDidDisappear = function () {
    
    if (this.currentViewController && this.currentViewController.viewDidDisappear) {
        this.currentViewController.viewDidDisappear();    
    }

};

NavigationViewController.prototype.viewDidUnload = function () {
    NavigationViewController.super_.prototype.viewDidUnload.call(this); 
    
    if (this.currentViewController && this.currentViewController.viewDidUnload) {
        this.currentViewController.viewDidUnload();  
    }
    
    this.currentViewController = null;
    this.rootViewController = null;
    
    this.navigationBar.unload();
    this.navigationBar = null;
    this.controllerView.unload();
    this.controllerView = null;

    if (window.iOS) {
        this.statusBar.unload();
        this.statusBar = null;
    }
};

module.exports = NavigationViewController;