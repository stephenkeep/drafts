var View = require('../views/view.js');

function ViewController() {
    this.name = 'viewController';
    this.view = new View();
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
    
    this.view.parentViewController = this;
    this.view.unload();
    this.view = null;
    this.name = null;
};

ViewController.prototype.presentModalViewController = function (modalViewController) {
 
    window.document.body.appendChild(modalViewController.view.element);
    
    if (modalViewController.viewDidLoad) {
        modalViewController.viewDidLoad();    
    }
};

module.exports = ViewController;