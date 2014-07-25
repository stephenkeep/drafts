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
    this.styles = {
        'backgroundColor': 'background-color',
        'float': 'float',
        'height': 'height',
        'width': 'width'
        
    };
}

View.prototype.appendChild = function (child) {
    
    var styles = Object.keys(this.styles);
    
    console.log(styles);
    
    //set the styles
    for (var i = 0, l = styles.length; i < l; i++) {
        var style = styles[i];
        if (child[style]) {
            child.element.style[this.styles[style]] = child[style];
        }
    }
    
    this.element.appendChild(child.element);
};

module.exports = View;