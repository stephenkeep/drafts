var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js');

var _initStyle = function (self) {
    self.element.style.backgroundColor = 'transparent';
    self.element.style.display = 'table';
    self.element.style.pointerEvents = 'none';
};

var _text = function () {
    
    var el = document.createElement('p');
    el.style.display = 'table-cell';
    el.style.height = '100%';
    el.style.pointerEvents = 'none';
    return el;
};

function Label() {
    View.apply(this, arguments);
    _initStyle(this);
    
    this.textElement = _text();
    this.element.appendChild(this.textElement);
    
    this.text = null;
    this.textColor = null;
    this.textAlign = null;
    this.textVerticalAlign = null;
    
    this.watch('text', this.setText);
    this.watch('textColor', this.setTextColor);
    this.watch('textAlign', this.setTextAlign);
    this.watch('textVerticalAlign', this.setTextVerticalAlign);
}

util.inherits(Label, View);

Label.prototype.setText = function (property, oldValue, newValue) {
    this.textElement.innerHTML = newValue;
};

Label.prototype.setTextColor = function (property, oldValue, newValue) {
    this.textElement.style.color = newValue;
};

Label.prototype.setTextAlign = function (property, oldValue, newValue) {
    this.textElement.style.textAlign = newValue;
};

Label.prototype.setTextVerticalAlign = function (property, oldValue, newValue) {
    this.textElement.style.verticalAlign = newValue;
};

module.exports = Label;