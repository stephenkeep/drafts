var _ = require('lodash');

module.exports = {
    name: 'app',
    view: document.body,
    extend: function(child) {
		return _.extend({}, this, child);
	},
    appWillFinishLaunching: function () {
        this.appDidFinishLauncing();
    },
    setRootViewController: function (rootViewController) {
        this.view.appendChild(rootViewController.view.element);
    }
};