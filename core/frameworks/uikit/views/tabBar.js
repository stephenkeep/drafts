var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view');

var element = function () {
    var el = document.createElement('ui-tabbar');
    el.style.display = 'flex';
    return el;
};

function TabBar() {
    View.apply(this, arguments);
    this.element = element();
    
    this.height = '48px';
    
    var textColor;
            
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
        }
    });
}

util.inherits(TabBar, View);


module.exports = TabBar;