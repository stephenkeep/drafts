var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view');

//Private Methods
var element = function () {
    
    var el = document.createElement('section');
    el.className = 'navigationView';
    return el;
};

//Public Methods
function NavigationView() {
    View.apply(this, arguments);
    this.element = element();
    this.name = 'navigationView';
    
}

util.inherits(NavigationView, View);

module.exports = NavigationView;