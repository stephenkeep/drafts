var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view'),
    Label = require(root + 'views/label');

var _initStyle = function (self) {
    self.element.style.borderTop = '1px solid rgba(1,1,1,0.1)';
    self.element.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
    self.element.style.maxHeight = '48px';
};

function NavigationBar() {
    View.apply(this, arguments);
    _initStyle(this);
    
    this.height = '48px';

    this.titleLabel = new Label();
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'middle';
    this.appendChild(this.titleLabel);

    this.title = '';
    
    this.watch('title', this.setTitle);
}

util.inherits(NavigationBar, View);

NavigationBar.prototype.setTitle = function (property, oldValue, newValue) {
    this.titleLabel.text = newValue;
};



module.exports = NavigationBar;