var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view');

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