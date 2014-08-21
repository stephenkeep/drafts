var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js'),
    ViewController = require(root + 'viewControllers/viewController.js');

function ModalViewController() {
    ViewController.apply(this, arguments); 
    
    this.view.backgroundColor = 'rgba(0,0,0,0.7)';
    this.view.element.style.zIndex = '9999999999';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '0px';
    this.view.element.style.left = '0px';
    this.view.element.style.pointerEvents = 'fill';
    
    this.view.element.onclick = this.dismissModalViewController.bind(this);
    
    this.container = new View();
    this.container.element.style['-webkit-transition-duration'] = '350ms';
    this.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';
    this.view.appendChild(this.container);
    
    // create an observer instance
    var observer = new window.MutationObserver(this.viewMutated.bind(this));
    observer.observe(this.container.element, { childList: true });
}

util.inherits(ModalViewController, ViewController);

ModalViewController.prototype.viewMutated = function(mutations) {
    
    var self = this;

    mutations.forEach(function(mutation) {

         if (mutation.addedNodes !== null && 
             mutation.target.parentView && 
             mutation.target.parentView.parentViewController) {

            var viewController = mutation.target.parentView.parentViewController;
            if (viewController.viewWillAppear) {
                viewController.viewWillAppear();    
            }
             
            self.addEventListener('webkitTransitionEnd', function _func() {
                if (viewController.viewDidAppear) {
                    viewController.viewDidAppear();    
                }
                self.removeEventListener('webkitTransitionEnd', _func);
            }, false);
                          
            self.container.element.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
        }
    });    
};

ModalViewController.prototype.setRootViewController = function (viewController) {
    
    this.rootViewController = viewController;
    this.container.appendChild(this.rootViewController.view);
    this.rootViewController.parentViewController = this;
};

ModalViewController.prototype.dismissModalViewController = function () {
    this.view.element.parentNode.removeChild(this.view.element);
};


module.exports = ModalViewController;