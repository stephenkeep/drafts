var View = require('../views/view.js');

function ViewController() {
    this.name = 'viewController';
    if (!this.view) {
        this.view = new View();  
    }
    this.view.parentViewController = this;
}

ViewController.prototype.viewDidLoad = function () {

};

ViewController.prototype.viewWillAppear = function () {

};

ViewController.prototype.viewDidAppear = function () {

};

ViewController.prototype.viewWillDisappear = function () {
    
};

ViewController.prototype.viewDidDisappear = function () {
    
};

ViewController.prototype.viewDidUnload = function () {
    
    this.parentViewController = null;
    this.view.parentViewController = null;
    this.view.destroy();

//    for (var prop in this) {
//        console.log(prop);
//        this[prop] = null;
//    }
};

ViewController.prototype.presentModalViewController = function (modalViewController) {
 
    window.document.body.appendChild(modalViewController.view.element);
    
    if (modalViewController.viewDidLoad) {
        modalViewController.viewDidLoad();    
    }
};

module.exports = ViewController;