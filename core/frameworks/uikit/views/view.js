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
        backgroundColor,
        borderColor;
    
    Object.defineProperty(this, 'width', {
        get: function() {
            return width;
        },
        set: function(newValue) {
            width = newValue;
            if (this.element) {
                this.element.style.minWidth = newValue;
                this.element.style.maxWidth = newValue;
                this.element.style.width = newValue;
            }
        }
    });
    
    Object.defineProperty(this, 'height', {
        get: function() {
            return height;
        },
        set: function(newValue) {
            height = newValue;
            if (this.element) {
                this.element.style.height = newValue;
            }
        }
    });
    
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return backgroundColor;
        },
        set: function(newValue) {
            backgroundColor = newValue;
            if (this.element) {
                this.element.style.backgroundColor = newValue;
            }
        }
    });
    
    Object.defineProperty(this, 'borderColor', {
        get: function() {
            return borderColor;
        },
        set: function(newValue) {
            borderColor = newValue;
            if (this.element) {
                this.element.style.outlineStyle = 'solid';
                this.element.style.outlineColor = newValue;
            }
        }
    });
}

View.prototype.unload = function () {

    this.element.parentElement.removeChild(this.element);
    this.element.parentView = null;
    this.element = null;
    
    for (var prop in this) {
        this[prop] = null;
    }
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