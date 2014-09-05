var util = require('util'),
    View = require('./view'),
    Label = require('./label');

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

    var title;

    
    Object.defineProperty(this, 'title', {
        get: function() {
          return title;
        },
        set: function(newValue) {
           title = newValue;
            if (this.titleLabel) {
                this.titleLabel.text = newValue;
            }
        },
        enumerable: true
    });
    
//        leftBarButton,
//        rightBarButton;
//    Object.defineProperty(this, 'leftBarButton', {
//        get: function() {
//          return leftBarButton;
//        },
//        set: function(newValue) {
//           leftBarButton = newValue;
//           this.appendChild(newValue);
//        }
//    });
//    
//    Object.defineProperty(this, 'rightBarButton', {
//        get: function() {
//          return rightBarButton;
//        },
//        set: function(newValue) {
//            rightBarButton = newValue;
//            this.appendChild(rightBarButton);
//        }
//    });
}

util.inherits(NavigationBar, View);

var _prototype = NavigationBar.prototype,
    _super = NavigationBar.super_.prototype;

_prototype.destroy = function () {

    this.titleLabel.destroy();
     
    _super.destroy.call(this); 
};

module.exports = NavigationBar;