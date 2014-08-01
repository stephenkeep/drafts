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
    
    var width,
        height,
        float,
        backgroundColor;
    
    Object.defineProperty(this, 'width', {
        get: function() {
          return width;
        },
        set: function(newValue) {
           width = newValue;
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
    
    Object.defineProperty(this, 'float', {
        get: function() {
          return float;
        },
        set: function(newValue) {
           float = newValue;
           this.element.style.float = newValue;
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

View.prototype.appendChild = function (child) {
    
    this.element.appendChild(child.element);
    
    if (child.parentViewController && child.parentViewController.viewDidLoad) {
        child.parentViewController.viewDidLoad();    
    }
};

module.exports = View;