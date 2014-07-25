var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var _initStyle = function (self) {
    self.element.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
    self.element.style.maxHeight = '48px';
    self.element.style.position = 'relative';
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
    this.titleLabel.textVerticalAlign = 'middle';
    this.appendChild(this.titleLabel);

    this.title = null;
    this.leftBarButton = null;
    this.rightBarButton = null;
    
    this.watch('title', this.setTitle);
    this.watch('leftBarButton', this.setLeftBarButton);
    this.watch('rightBarButton', this.setRightBarButton);
}

util.inherits(NavigationBar, View);

NavigationBar.prototype.setTitle = function (property, oldValue, newValue) {
    this.titleLabel.text = newValue;
};

NavigationBar.prototype.setLeftBarButton = function (property, oldValue, newValue) {
    this.appendChild(newValue);
};

NavigationBar.prototype.setRightBarButton = function (property, oldValue, newValue) {
    var rightBarButton = newValue;
    rightBarButton.float = 'right';
    this.appendChild(rightBarButton);
};


module.exports = NavigationBar;