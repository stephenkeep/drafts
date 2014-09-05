var util = require('util'),
    View = require('./view'),
    Label = require('./label');

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

var element = function () {
    
    var el = document.createElement('ui-tabbarbutton');
    el.style.pointerEvents = 'fill';
    el.style.flex = '1';
    return el;
};

function TabBarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();

    //SETUP INHERITED PROPERTIES
    this.height = '48px';
    this.width = '100px';
    
    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.fontSize = '13px';
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
    this.element.onclick = function () {
        if (self.tabBarViewController && self.tabBarViewController.didPressTabBarButton) {
            self.tabBarViewController.didPressTabBarButton(self); 
        }
    };
    
    //CUSTOM PROPERTIES
    var text,
        textColor,
        selected;
            
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
           text = newValue;
           this.titleLabel.text = newValue;
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
           this.titleLabel.textColor = newValue;
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'selected', {
        get: function() {
          return selected;
        },
        set: function(newValue) {
           selected = newValue;
           if (selected) {
               if (!textColor) {
                   textColor = this.titleLabel.element.style.color;
               }
               this.titleLabel.textColor = textColor;
                
            } else {
               this.titleLabel.textColor = blendColors(textColor, '#000000', 0.4);
            }
        },
        enumerable: true
    });
}

util.inherits(TabBarButton, View);

module.exports = TabBarButton;