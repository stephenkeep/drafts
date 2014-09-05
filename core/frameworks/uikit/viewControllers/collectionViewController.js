var util = require('util'),
    ViewController = require('./viewController.js'),
    ScrollViewController = require('./scrollViewController.js');

function CollectionViewController() {
    ViewController.apply(this, arguments);

    this.scrollViewController = new ScrollViewController();
    this.scrollViewController.delegate = this;
    this.scrollViewController.view.backgroundColor = 'transparent';
    this.view.appendChild(this.scrollViewController.view);
    
    this.rows = null;  
    this.cells = [];
    this.containers = [];
    
    this.height = 0;
    this.upperIndex = 0;
    this.cellHeight = 0;
    this.lowerIndex = 0;
}

util.inherits(CollectionViewController, ViewController);

var _prototype = CollectionViewController.prototype,
    _super = CollectionViewController.super_.prototype;

_prototype.viewDidUnload = function () {
    
    this.scrollViewController.viewDidUnload();
    
    this.delegate = null;
    
    for (var i = 0, l = this.cells.length; i < l; i++) {
        var cell = this.cells[i];
        cell.destroy();
    }
    
    _super.viewDidUnload.call(this); 
};


_prototype.loadData = function () {
    var self = this;
    
    if (!this.delegate || !this.delegate.cellForIndex) {
        return;
    }

    this.scrollViewController.scrollToTop();
    this.height = this.view.element.offsetHeight;
    this.upperIndex = 0;
    this.cellHeight = parseInt(this.cellHeight);
    this.lowerIndex = Math.ceil(this.height / this.cellHeight) - 1;

    var l = this.rows - this.cells.length; 
    
    var initialCellCount = this.cells.length;

    for (var i = 0; i < l; i++) {

        var index = initialCellCount + i,
            cell = this.delegate.cellForIndex(this, index);
        
        if (cell.selected) {
            this.selectedCell = cell; 
        }

        cell.index = index;   
        cell.height = self.cellHeight + 'px';
        
        cell.onClick = this.didPressCellAtIndex.bind(this);
        
        this.containers.push(cell.element.childNodes[0].cloneNode(true));
        if (index > this.lowerIndex) {
            cell.empty();
        }
        
        this.cells.push(cell);
        self.scrollViewController.view.appendChild(cell);
    }
};

_prototype.scrollViewDidScroll = function (scrollViewController, position, direction) {
   
    var i = null,
        upperIndex = Math.floor(position / this.cellHeight) - 1,
        lowerIndex = Math.ceil((position + this.height) / this.cellHeight) - 1;
    
    if (direction === 'SCROLL_DIRECTION_DOWN') {
        
        if (upperIndex >= this.upperIndex) {
            
            for (i = this.upperIndex; i <= upperIndex; i++) {
                this.removeCellForIndex(i);
            }
            this.upperIndex = upperIndex;
        }
        if (lowerIndex >= this.lowerIndex) {
            
            for (i = this.lowerIndex + 1; i <= lowerIndex; i++) {
                this.cellForIndex(i);     
            }
            this.lowerIndex = lowerIndex;
        }
        
    } else {
        
        if (upperIndex < this.upperIndex) {

            var uIndex = upperIndex < 0 ? 0 : upperIndex;
            for (i = this.upperIndex; i >= uIndex; i--) {
                this.cellForIndex(i);
            }
            this.upperIndex = uIndex;
        }
        if (lowerIndex < this.lowerIndex) {
            
            for (i = this.lowerIndex; i > lowerIndex; i--) {
                this.removeCellForIndex(i);
            }
            this.lowerIndex = lowerIndex;
        }
    }
};

_prototype.cellForIndex = function (index) {
  
    if (index < this.cells.length) {
        var cell = this.cells[index],
            container = this.containers[index];
    
        cell.element.appendChild(container);
    }

};

_prototype.removeCellForIndex = function (index) {
   
    if (index < this.cells.length) {
        var cell = this.cells[index];
        cell.empty();
    }
};

_prototype.didPressCellAtIndex = function (cell, index) {
    
    if (this.selectedCell) {
        this.selectedCell.selected = false;
    }

    this.selectedCell = cell;
    this.selectedCell.selected = true;

    if (this.delegate && this.delegate.didPressCellAtIndex) {
        this.delegate.didPressCellAtIndex(this, cell, index);
    } else {
        console.error('didPressCellAtIndex not found');
    }
};

module.exports = CollectionViewController;