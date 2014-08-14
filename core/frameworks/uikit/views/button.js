var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var element = function () {
    
    var el = document.createElement('ui-button');
    el.style.pointerEvents = 'fill';
    el.style.position = 'relative';
    el.style.minHeight = '48px';
    el.style.minWidth = '48px';
    el.style.border = '0px';
    el.style.padding = '0px';
    el.style.margin = '0px';
    return el;
};

function BarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();
    
    this.content = new View();
    this.appendChild(this.content);

    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textElement.style.fontSize = '17px';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.content.appendChild(this.titleLabel);
    
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
        iconColor,
        textColor,
        type;
    
    Object.defineProperty(this, 'type', {
        get: function() {
          return type;
        },
        set: function(newValue) {
            type = newValue;
            if (type === 'rounded') {
                this.content.backgroundColor = this.backgroundColor;
                this.content.height = '-webkit-calc(100% - 10px)';
                this.content.element.style.borderRadius = '3px';
                this.element.style.marginTop = '5px';
                this.backgroundColor = 'transparent';
            }
        }
    });
        
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
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
           this.titleLabel.textColor = newValue;
        }
    });
}

util.inherits(BarButton, View);

module.exports = BarButton;