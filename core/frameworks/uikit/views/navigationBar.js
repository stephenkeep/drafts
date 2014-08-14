var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var element = function () {
    
    var el = document.createElement('ui-navigationbar');
    return el;
};

function NavigationBar() {
    View.apply(this, arguments);
    this.element = element();
    
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