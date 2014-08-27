var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    
    var el = document.createElement('ui-scrollview');
    el.style.overflowY = 'scroll';
    return el;
};

//Public Methods
function ScrollView() {
    View.apply(this, arguments);
    this.element = element();
    this.name = 'scrollView';
    
}

util.inherits(ScrollView, View);

module.exports = ScrollView;