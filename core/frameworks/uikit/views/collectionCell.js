var util = require('util'),
    View = require('./view.js'),
    Label = require('./label.js');

var element = function () {
    
    var el = document.createElement('ui-collectioncell');
    el.style.position = 'relative';
    el.style.pointerEvents = 'fill';
    return el;
};

var container = function () {
    
    var el = document.createElement('ui-collectioncellcontainer');
    return el;
};

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

function CollectionCell() {
    View.apply(this, arguments);
    
    this.element = element();
    this.container = container();
    this.element.appendChild(this.container);
    
    var self = this;
    self.backgroundColor = '#FFF';
    
    //CUSTOM MOUSE EVENTS
   var _backgroundColor;
//    this.element.onmouseover = function () {
//        if (!selected) {
//            if (!_backgroundColor) {
//                _backgroundColor = self.backgroundColor;
//            }
//            self.backgroundColor = blendColors(_backgroundColor, '#000000', 0.1);
//        }
//    };
//    this.element.onmouseout = function () {
//        if (!selected) {
//            self.backgroundColor = _backgroundColor;
//        }
//    };
    
    //CUSTOM PROPERTIES
    var onClick,
        selected;
        
    Object.defineProperty(this, 'onClick', {
        get: function() {
          return onClick;
        },
        set: function(newValue) {
            onClick = newValue;
            if (this.element) {
                this.clickEvent = this.element.addEventListener('click', _onClick, false);    
            }
        }
    });
    
    Object.defineProperty(this, 'selected', {
        get: function() {
          return selected;
        },
        set: function(newValue) {
           selected = newValue;
           if (selected) {
               if (!_backgroundColor) {
                   _backgroundColor = self.backgroundColor;
               }
               if (this.selectedBackgroundColor) {
                   self.backgroundColor = this.selectedBackgroundColor;
               } else {
                   self.backgroundColor = blendColors(_backgroundColor, '#000000', 0.2);
               }
            } else {
                self.backgroundColor = _backgroundColor;
            }
        }
    });
    

    //PRIVATE METHODS
    var _onClick = function () {
        
        onClick(self, self.index);        
    };
}

util.inherits(CollectionCell, View);

var _prototype = CollectionCell.prototype,
    _super = CollectionCell.super_.prototype;

_prototype.unload = function () {

    this.container.unload();
    this.element.removeEventListener(this.clickEvent);
     
    _super.unload.call(this); 
};

_prototype.appendChild = function (child) {
    
    this.container.appendChild(child.element);
    
};

module.exports = CollectionCell;