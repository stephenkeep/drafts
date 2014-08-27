var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController.js');

function ModalViewController() {
    ViewController.apply(this, arguments); 
    var self = this;
    
    this.view.backgroundColor = 'rgba(0,0,0,0.7)';
    this.view.element.style.zIndex = '9999999999';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '0px';
    this.view.element.style.left = '0px';
    this.view.element.style.pointerEvents = 'fill';
    
    this.viewEvent = this.view.element.addEventListener('click', function _func(e) {
        //if (e.target === self.view.element) {
            self.view.element.removeEventListener(self.viewEvent);
            self.viewEvent = null;
            self.dismissModalViewController();
        //}
    }, false);
    
    this.container = new View();
    this.container.element.style['-webkit-transition-duration'] = '200ms';
    this.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';
    this.view.appendChild(this.container);
    
    // create an observer instance
    this.observer = new window.MutationObserver(this.viewMutated.bind(this));
    this.observer.observe(this.container.element, { childList: true });
}


util.inherits(ModalViewController, ViewController);

ModalViewController.prototype.viewMutated = function(mutations) {
    
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
             
            self.container.element.addEventListener('webkitTransitionEnd', function _func() {
                self.container.element.removeEventListener('webkitTransitionEnd', _func);
                if (viewController.viewDidAppear) {
                    viewController.viewDidAppear();    
                }
            }, false);
                          
            self.container.element.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
            
            self.observer.disconnect();
        }
    });    
};

ModalViewController.prototype.setRootViewController = function (viewController) {
    
    this.rootViewController = viewController;
    this.container.appendChild(this.rootViewController.view);
    this.rootViewController.parentViewController = this;
};

ModalViewController.prototype.dismissModalViewController = function () {
    
    var self = this;
    
    if (self.viewEvent) {
        self.view.element.removeEventListener(self.viewEvent);
    }

    self.container.element.addEventListener('webkitTransitionEnd', function _func() {
        
        self.container.element.removeEventListener('webkitTransitionEnd', _func);
        
        if (this.rootViewController && this.rootViewController.viewDidDisappear) {
            this.rootViewController.viewDidDisappear();    
        }
        self.view.element.parentNode.removeChild(self.view.element);
        
    }, false);
    
    if (this.rootViewController && this.rootViewController.viewWillDisappear) {
        this.rootViewController.viewWillDisappear();    
    }
    self.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';
    
};


module.exports = ModalViewController;