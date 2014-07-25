var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var _initStyle = function (self) {
    self.element.style.maxHeight = '48px';
    self.element.style.minHeight = '48px';
    self.element.style.minWidth = '48px';
};

var _mouseOver = function () {
    console.log(this.iconColor);
    console.log('boom!');
};

var _mouseOut = function () {
    
};

function BarButton() {
    View.apply(this, arguments);
    _initStyle(this);
    
    this.float = 'left';
    this.height = '48px';
    this.width = '48px';
    
    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'middle';
    this.appendChild(this.titleLabel);
    
    this.onClick = null;
    this.icon = null;
    this.iconColor = null;
    
    this.watch('icon', this.setIcon);
    this.watch('iconColor', this.setIconColor);
    this.watch('onClick', this.setOnClick);
    
    this.element.onmouseover = _mouseOver;
    this.element.onmouseout = _mouseOut;
}

util.inherits(BarButton, View);

BarButton.prototype.setOnClick = function (property, oldValue, newValue) {
    this.element.onclick = newValue;
};

BarButton.prototype.setIcon = function (property, oldValue, newValue) {
    this.titleLabel.textElement.className = 'icon-' + newValue;
};

BarButton.prototype.setIconColor = function (property, oldValue, newValue) {
    console.log(newValue);
    this.titleLabel.textColor = newValue;
};


module.exports = BarButton;