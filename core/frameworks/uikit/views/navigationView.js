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

var _prototype = NavigationView.prototype,
    _super = NavigationView.super_.prototype;

_prototype.destroy = function () {

    _super.destroy.call(this); 
};

module.exports = NavigationView;