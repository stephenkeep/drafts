var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController.js');

function ModalViewController() {
    ViewController.apply(this, arguments); 
    var self = this;
    
    this.view.backgroundColor = 'transparent';
    this.view.element.style.zIndex = '9999999999';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '0px';
    this.view.element.style.left = '0px';
    this.view.element.style.pointerEvents = 'fill';
    
    this.viewEvent = this.view.element.addEventListener('click', function _func() {
        //if (e.target === self.view.element) {
            self.dismissModalViewController();
        //}
    }, false);
    
    this.container = new View();
    this.container.element.style['-webkit-transition-duration'] = '250ms';
    this.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';
    this.view.appendChild(this.container);
    
    // create an observer instance
    this.observer = new window.MutationObserver(this.viewMutated.bind(this));
    this.observer.observe(this.container.element, { childList: true });
}


util.inherits(ModalViewController, ViewController);

var _prototype = ModalViewController.prototype,
    _super = ModalViewController.super_.prototype;

_prototype.viewMutated = function(mutations) {
    
    var self = this;

    mutations.forEach(function(mutation) {
        
        if (mutation.addedNodes !== null && 
            mutation.addedNodes.length > 0 && 
            mutation.addedNodes[0].parentView && 
            mutation.addedNodes[0].parentView.parentViewController) {

            self.viewWillAppear();
             
            self.container.element.addEventListener('webkitTransitionEnd', function _func() {
                self.container.element.removeEventListener('webkitTransitionEnd', _func);
                
                self.viewDidAppear();
                
            }, false);
                          
            self.container.element.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
            
            self.observer.disconnect();
            self.observer = null;
        }
    });    
};

_prototype.viewWillAppear = function () {
    _super.viewWillAppear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewWillAppear) {
        this.rootViewController.viewWillAppear();    
    }

};

_prototype.viewDidAppear = function () {
    _super.viewDidAppear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewDidAppear) {
        this.rootViewController.viewDidAppear();    
    }

};

_prototype.viewWillDisappear = function () {
    _super.viewWillDisappear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewWillDisappear) {
        this.rootViewController.viewWillDisappear();    
    }

};

_prototype.viewDidDisappear = function () {
    _super.viewDidDisappear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewDidDisappear) {
        this.rootViewController.viewDidDisappear();    
    }

};

_prototype.viewDidUnload = function () {
    
    this.container.destroy();
    
    this.view.element.style.zIndex = null;
    this.view.element.style.position = null;
    this.view.element.style.top = null;
    this.view.element.style.left = null;
    this.view.element.style.pointerEvents = null;

    if (this.viewEvent) {
        this.view.element.removeEventListener(this.viewEvent);
        this.viewEvent = null;
    }
    
    if (this.observer) {
        this.observer.disconnect();
        this.observer = null;    
    }

    if (this.rootViewController && this.rootViewController.viewDidUnload) {
        this.rootViewController.viewDidUnload();    
    }
    this.rootViewController = null;
    
    _super.viewDidUnload.call(this); 
};

_prototype.setRootViewController = function (viewController) {
    
    this.rootViewController = viewController;
    this.container.appendChild(this.rootViewController.view);
    this.rootViewController.parentViewController = this;
};

_prototype.dismissModalViewController = function () {
    
    var self = this;
    
    self.container.element.addEventListener('webkitTransitionEnd', function _func() {
        
        self.container.element.removeEventListener('webkitTransitionEnd', _func);
        
        self.viewDidDisappear();
        self.viewDidUnload();
        
    }, false);
    
    self.viewWillDisappear();

    self.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';        
};


module.exports = ModalViewController;