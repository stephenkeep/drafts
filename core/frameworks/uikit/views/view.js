//Private Methods
var element = function () {
    
    var el = document.createElement('ui-view');
    return el;
};

//Public Methods
function View() {
    this.element = element();
    this.element.parentView = this;
    
    this.name = 'view';
    
    var width,
        height,
        backgroundColor;
    
    Object.defineProperty(this, 'width', {
        get: function() {
          return width;
        },
        set: function(newValue) {
           width = newValue;
           this.element.style.minWidth = newValue;
           this.element.style.maxWidth = newValue;
           this.element.style.width = newValue;
        }
    });
    
    Object.defineProperty(this, 'height', {
        get: function() {
          return height;
        },
        set: function(newValue) {
           height = newValue;
           this.element.style.height = newValue;
        }
    });
    
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
          return backgroundColor;
        },
        set: function(newValue) {
           backgroundColor = newValue;
           this.element.style.backgroundColor = newValue;
        }
    });
}

View.prototype.unload = function () {
    
    this.element = null;
};

View.prototype.empty = function () {
    
    this.element.textContent = '';
};

View.prototype.appendChild = function (child) {
    
    this.element.appendChild(child.element);
    
};

View.prototype.replaceChild = function (replacement, child) {
    
    this.element.replaceChild(replacement.element, child.element);
    
};

module.exports = View;