var View = require('../views/view.js');

function ViewController() {
    this.name = 'viewController';
    this.view = new View();
    this.view.parentViewController = this;
}

ViewController.prototype.presentModalViewController = function (modalViewController) {
 
    window.app.view.appendChild(modalViewController.view.element);
    
    if (modalViewController.viewDidLoad) {
        modalViewController.viewDidLoad();    
    }
};



module.exports = ViewController;