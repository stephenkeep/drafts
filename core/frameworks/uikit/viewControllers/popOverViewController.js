var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController'),
    View = require(root + 'views/view');

function PopOverViewController() {
    ViewController.apply(this, arguments); 

    this.view.backgroundColor = 'transparent';
    this.view.height = '30px';
    this.view.width = '30px';
    this.view.element.style.overflow = 'visible';
    this.view.element.style.zIndex = '1000';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '200px';
    this.view.element.style.left = '200px';
    
    this.arrow = new View();
    this.arrow.backgroundColor = 'transparent';
    this.arrow.width = 'initial';
    this.arrow.height = 'initial';
    this.arrow.element.style.borderTop = '7px solid #000';
    this.arrow.element.style.borderRight = '7px solid transparent';
    this.arrow.element.style.borderLeft = '7px solid transparent';
    this.arrow.element.style.bottom = '35px';
    this.arrow.element.style.display = 'block';
    this.arrow.element.style.left = '50%';
    this.arrow.element.style.marginLeft = '-7px';
    this.arrow.element.style.position = 'absolute';
    this.view.appendChild(this.arrow);
    
    this.content = new View();
    this.content.element.style.overflow = 'hidden';
    this.content.element.style.borderRadius = '4px';
    this.content.element.style.boxShadow = '1px 1px 20px rgba(0,0,0,0.4)';
    this.content.element.style.position = 'absolute';
    this.content.element.style.bottom = '42px';
    this.content.element.style.left = '-85px';
    this.content.element.style.display = 'block';
    this.content.backgroundColor = '#000';
    this.content.height = '48px';
    this.content.width = '200px';
    this.view.appendChild(this.content);

}

util.inherits(PopOverViewController, ViewController);

PopOverViewController.prototype.setRootViewController = function (viewController) {
    this.rootViewController = viewController;
    
    var width = parseInt(this.rootViewController.view.width);
    width = (width / 2) - 15;
    
    this.content.element.style.left = '-' + width + 'px'; 
    this.content.width = this.rootViewController.view.width;
    this.content.appendChild(this.rootViewController.view);
    
    this.rootViewController.parentViewController = this;
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

PopOverViewController.prototype.setXYPosition = function (x, y) {
    this.view.element.style.top = y + 'px';
    this.view.element.style.left = x - 15 + 'px';
};

PopOverViewController.prototype.hide = function () {
    this.view.element.style.display = 'none';
};

PopOverViewController.prototype.show = function () {
    this.view.element.style.display = 'initial';
};

module.exports = PopOverViewController;