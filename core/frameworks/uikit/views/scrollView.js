var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view');

//Private Methods
var element = function () {
    
    var el = document.createElement('div');
    el.className = 'scrollView';
    el.style.overflowY = 'scroll';
    el.style.flex = '1';
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