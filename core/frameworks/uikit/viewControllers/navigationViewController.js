var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController'),
    NavigationView = require('../views/navigationView'),
    NavigationBar = require('../views/navigationBar');

function NavigationViewController() {
    
    this.view = new NavigationView();
    
    ViewController.apply(this, arguments); 

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

var _prototype = NavigationViewController.prototype,
    _super = NavigationViewController.super_.prototype;

_prototype.viewMutated = function(mutations) {
    
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
            viewController = null;
            
            self.observer.disconnect();
            self.observer = null;
        }
    });    
};

_prototype.setRootViewController = function (viewController) {
        
    this.rootViewController = viewController;
    this.rootViewController.view.element.style.position = 'absolute';
    this.navigationBar.title = this.rootViewController.title;
    this.rootViewController.navigationBar = this.navigationBar;
    this.controllerView.appendChild(this.rootViewController.view);
    
    this.currentViewController = this.rootViewController;
    
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

_prototype.viewWillAppear = function () {
    _super.viewWillAppear.call(this);
    if (this.currentViewController && this.currentViewController.viewWillAppear) {
        this.currentViewController.viewWillAppear();    
    }
};

_prototype.viewDidAppear = function () {
    _super.viewDidAppear.call(this);
    if (this.currentViewController && this.currentViewController.viewDidAppear) {
        this.currentViewController.viewDidAppear();    
    }
};

_prototype.viewDidDisappear = function () {
    _super.viewDidDisappear.call(this);
    if (this.currentViewController && this.currentViewController.viewDidDisappear) {
        this.currentViewController.viewDidDisappear();    
    }

};

_prototype.viewDidUnload = function () {
    
    if (this.rootViewController === this.currentViewController) {
        
        if (this.rootViewController.viewDidUnload) {
            this.rootViewController.viewDidUnload();  
            this.rootViewController = null;
            this.currentViewController = null;
        }
        
    } else {
        
        if (this.rootViewController.viewDidUnload) {
            this.rootViewController.viewDidUnload();  
            this.rootViewController = null;
        }
        
        if (this.currentViewController.viewDidUnload) {
            this.currentViewController.viewDidUnload();  
            this.currentViewController = null;
        }
    }
    
    
    this.navigationBar.destroy();
    this.navigationBar = null;
    this.controllerView.destroy();
    this.controllerView = null;

    if (this.statusBar) {
        this.statusBar.destroy();
        this.statusBar = null;
    }
    
    if (this.observer) {
        this.observer.disconnect();
        this.observer = null;    
    }
    
    _super.viewDidUnload.call(this); 
};

module.exports = NavigationViewController;