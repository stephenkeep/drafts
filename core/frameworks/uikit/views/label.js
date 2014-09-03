var util = require('util'),
    View = require('./view.js');

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
            if (this.element) {
                this.element.style.top = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'left', {
        get: function() {
          return left;
        },
        set: function(newValue) {
           left = newValue;
            if (this.element) {
                this.element.style.left = newValue;
            }
           this.width = '-webkit-calc(100% - ' + newValue + ' - ' + newValue + ')';
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
            text = newValue;
            if (this.textElement) {
                this.textElement.textContent = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
            if (this.textElement) {
                this.textElement.style.color = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textAlign', {
        get: function() {
          return textAlign;
        },
        set: function(newValue) {
           textAlign = newValue;
            if (this.textElement) {
                this.textElement.style.textAlign = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'fontSize', {
        get: function() {
          return fontSize;
        },
        set: function(newValue) {
           fontSize = newValue;
            if (this.textElement) {
                this.textElement.style.fontSize = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textVerticalAlign', {
        get: function() {
          return textVerticalAlign;
        },
        set: function(newValue) {
            textVerticalAlign = newValue;
            if (this.textElement) {
                this.textElement.style['-webkit-box-pack'] = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'numberOfLines', {
        get: function() {
          return numberOfLines;
        },
        set: function(newValue) {
            numberOfLines = newValue;
            if (this.textElement) {
                this.textElement.style['-webkit-line-clamp'] = newValue;
            }
        },
        enumerable: true
    });
}

util.inherits(Label, View);

var _prototype = Label.prototype,
    _super = Label.super_.prototype;


module.exports = Label;