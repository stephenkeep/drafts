var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    
    var el = document.createElement('ui-navigationview');
    el.style.display = '-webkit-flex';
    el.style['-webkit-flex-direction'] = 'column';
    return el;
};

//Public Methods
function NavigationView() {
    View.apply(this, arguments);
    this.element = element();
    this.element.parentView = this;
    this.name = 'navigationView';
    
}

util.inherits(NavigationView, View);

module.exports = NavigationView;