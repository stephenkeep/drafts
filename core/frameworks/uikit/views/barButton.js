var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var _initStyle = function (self) {
    self.element.style.maxHeight = '48px';
    self.element.style.minHeight = '48px';
    self.element.style.minWidth = '48px';
    self.element.style.pointerEvents = 'fill';
};

function BarButton() {
    var self = this;
    View.apply(this, arguments);
    _initStyle(this);

    //SETUP INHERITED PROPERTIES
    this.float = 'left';
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