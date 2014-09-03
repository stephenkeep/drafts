var App = function () {
    window.iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
};

App.prototype.appWillFinishLaunching = function () {
    this.appDidFinishLauncing();
};

App.prototype.setRootViewController = function (rootViewController) {
    window.document.body.appendChild(rootViewController.view.element);
};

module.exports = App;