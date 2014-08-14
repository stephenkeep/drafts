var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js');

var element = function () {
    
    var el = document.createElement('ui-label');
    el.style.backgroundColor = 'transparent';
    el.style.display = 'block';
    el.style.pointerEvents = 'none';
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.left = '0';
    return el;
};

var _text = function () {
    
    var el = document.createElement('p');
    el.style.height = '100%';
    el.style.textOverflow = 'ellipsis';
    el.style.display = '-webkit-box';
    el.style['-webkit-line-clamp'] = '1';
    el.style['-webkit-box-orient'] = 'vertical';
    return el;
};

function Label() {
    View.apply(this, arguments);
    this.element = element();
    
    this.textElement = _text();
    this.element.appendChild(this.textElement);
    
    var top,
        left,
        text,
        textColor,
        textAlign,
        fontSize,
        numberOfLines,
        textVerticalAlign = null;
    
    Object.defineProperty(this, 'top', {
        get: function() {
          return top;
        },
        set: function(newValue) {
           top = newValue;
           this.element.style.top = newValue;
        }
    });
    
    Object.defineProperty(this, 'left', {
        get: function() {
          return left;
        },
        set: function(newValue) {
           left = newValue;
           this.element.style.left = newValue;
           this.width = '-webkit-calc(100% - ' + newValue + ' - ' + newValue + ')';
        }
    });
    
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
           text = newValue;
           this.textElement.innerHTML = newValue;
        }
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
           this.textElement.style.color = newValue;
        }
    });
    
    Object.defineProperty(this, 'textAlign', {
        get: function() {
          return textAlign;
        },
        set: function(newValue) {
           textAlign = newValue;
           this.textElement.style.textAlign = newValue;
        }
    });
    
    Object.defineProperty(this, 'fontSize', {
        get: function() {
          return fontSize;
        },
        set: function(newValue) {
           fontSize = newValue;
           this.textElement.style.fontSize = newValue;
        }
    });
    
    Object.defineProperty(this, 'textVerticalAlign', {
        get: function() {
          return textVerticalAlign;
        },
        set: function(newValue) {
            textVerticalAlign = newValue;
            this.textElement.style['-webkit-box-pack'] = newValue;
        }
    });
    
    Object.defineProperty(this, 'numberOfLines', {
        get: function() {
          return numberOfLines;
        },
        set: function(newValue) {
           numberOfLines = newValue;
           this.textElement.style['-webkit-line-clamp'] = newValue;
        }
    });
}

util.inherits(Label, View);


module.exports = Label;