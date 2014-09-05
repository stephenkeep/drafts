var util = require('util'),
    View = require('./view');

var element = function () {
    var el = document.createElement('ui-tabbar');
    el.style.display = '-webkit-flex';
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
        },
        enumerable: true
    });
}

util.inherits(TabBar, View);


module.exports = TabBar;