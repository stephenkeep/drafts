var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    var el = document.createElement('ui-tabview');
    return el;
};

//Public Methods
function TabView() {
    View.apply(this, arguments);
    this.element = element();
    this.name = 'tabView';
    
}

util.inherits(TabView, View);

module.exports = TabView;