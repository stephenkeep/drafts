var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var _initStyle = function (self) {
    self.element.style.outline = '1px solid rgba(0,0,0,0.1)';
    self.element.style.maxHeight = '48px';
    self.element.style.position = 'relative';
    self.element.style.zIndex = '1000';
};

function NavigationBar() {
    View.apply(this, arguments);
    _initStyle(this);
    
    this.height = '48px';

    this.titleLabel = new Label();
    this.titleLabel.element.style.position = 'absolute';
    this.titleLabel.element.style.top = '0';
    this.titleLabel.element.style.left = '0';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.appendChild(this.titleLabel);

    var title,
        leftBarButton,
        rightBarButton;
    
    Object.defineProperty(this, 'title', {
        get: function() {
          return title;
        },
        set: function(newValue) {
           title = newValue;
           this.titleLabel.text = newValue;
        }
    });
    
    Object.defineProperty(this, 'leftBarButton', {
        get: function() {
          return leftBarButton;
        },
        set: function(newValue) {
           leftBarButton = newValue;
           this.appendChild(newValue);
        }
    });
    
    Object.defineProperty(this, 'rightBarButton', {
        get: function() {
          return rightBarButton;
        },
        set: function(newValue) {
            rightBarButton = newValue;
            rightBarButton.float = 'right';
            this.appendChild(rightBarButton);
        }
    });
}

util.inherits(NavigationBar, View);


module.exports = NavigationBar;