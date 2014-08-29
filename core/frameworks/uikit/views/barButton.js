var util = require('util'),
    View = require('./view'),
    Label = require('./label');

var element = function () {
    
    var el = document.createElement('ui-barbutton');
    el.style.maxHeight = '48px';
    el.style.minHeight = '48px';
    el.style.minWidth = '48px';
    el.style.pointerEvents = 'fill';
    return el;
};

function BarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();

    //SETUP INHERITED PROPERTIES
    this.height = '48px';
    this.width = '48px';
    
    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.appendChild(this.titleLabel);
    
    //CUSTOM MOUSE EVENTS
    this.element.onmouseover = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    this.element.onmouseout = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    
    //CUSTOM PROPERTIES
    var onClick,
        icon,
        iconColor;
        
    Object.defineProperty(this, 'onClick', {
        get: function() {
          return onClick;
        },
        set: function(newValue) {
           onClick = newValue;
           this.element.onclick = newValue;
        }
    });
    
    Object.defineProperty(this, 'icon', {
        get: function() {
          return icon;
        },
        set: function(newValue) {
           icon = newValue;
           this.titleLabel.textElement.className = 'icon-' + newValue;
        }
    });
    
    Object.defineProperty(this, 'iconColor', {
        get: function() {
          return iconColor;
        },
        set: function(newValue) {
           iconColor = newValue;
           this.titleLabel.textColor = newValue;
        }
    });
}

util.inherits(BarButton, View);

module.exports = BarButton;