var App = function () {
    window.app = this;
    this.view = document.body;
    
};

App.prototype.appWillFinishLaunching = function () {
    this.appDidFinishLauncing();
};

App.prototype.setRootViewController = function (rootViewController) {
    this.view.appendChild(rootViewController.view.element);
};

module.exports = App;