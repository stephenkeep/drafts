//Private Methods
var element = function () {
    
    var el = document.createElement('div');
    el.className = 'view';
    return el;
};


//Public Methods
function View() {
    this.element = element();
    this.name = 'view';
    
    this.width = null;
    this.height = null;
    this.float = null;
    this.backgroundColor = null;
    
    this.watch('width', this.setProperty);
    this.watch('height', this.setProperty);
    this.watch('float', this.setProperty);
    this.watch('backgroundColor', this.setProperty);
}

View.prototype.setProperty = function (property, oldValue, newValue) {
    this.element.style[property] = newValue;
};

View.prototype.appendChild = function (child) {
    
    this.element.appendChild(child.element);
};

module.exports = View;