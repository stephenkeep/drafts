var util = require('util'),
    View = require('./view'),
    Label = require('./label');

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
    this.content.backgroundColor = 'transparent';
    this.appendChild(this.content);
    
    this.iconLabel = new Label();
    this.iconLabel.textElement.style.font = 'font-family: "icons"';
    this.iconLabel.textElement.style.fontSize = '17px';
    this.iconLabel.textAlign = 'center';
    this.iconLabel.textVerticalAlign = 'center';
    this.content.appendChild(this.iconLabel);

    this.titleLabel = new Label();
    this.titleLabel.textElement.style.lineHeight = '40px';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.content.appendChild(this.titleLabel);
    
    //CUSTOM MOUSE EVENTS
    var _backgroundColor = this.backgroundColor,
        _iconColor = self.iconColor || self.textColor;
    this.element.onmouseover = function () {
        
        self.content.backgroundColor = _iconColor;
        self.titleLabel.textColor = _backgroundColor;
        self.iconLabel.textColor = _backgroundColor;
    };
    this.element.onmouseout = function () {

        self.content.backgroundColor = _backgroundColor;
        self.titleLabel.textColor = _iconColor;
        self.iconLabel.textColor = _iconColor;
    };
    
    //CUSTOM PROPERTIES
    var onClick,
        icon,
        text,
        textColor,
        type;
    
    Object.defineProperty(this, 'type', {
        get: function() {
          return type;
        },
        set: function(newValue) {
            type = newValue;
            if (type === 'rounded') {
                _backgroundColor =  this.backgroundColor;
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
            this.iconLabel.textElement.className = 'icon-' + newValue;
            this.iconLabel.element.style.top = '-1px';
            this.titleLabel.width = '-webkit-calc(100% - 38px)';
            this.titleLabel.element.style.left = '32px'; 
        }
    });
    
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
            text = newValue;
            this.titleLabel.text = newValue;
            this.iconLabel.width = '44px';
        }
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
            _iconColor = newValue;
            textColor = newValue;
            this.titleLabel.textColor = newValue;
        }
    });
}

util.inherits(BarButton, View);

module.exports = BarButton;