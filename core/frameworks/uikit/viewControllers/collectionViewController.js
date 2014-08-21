var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    View = require(root + 'views/view.js'),
    ViewController = require(root + 'viewControllers/viewController.js'),
    ScrollViewController = require(root + 'viewControllers/scrollViewController.js');

function CollectionViewController() {
    ViewController.apply(this, arguments);
    var self = this;
    
    this.scrollViewController = new ScrollViewController();
    this.scrollViewController.delegate = this;
    this.scrollViewController.view.backgroundColor = 'transparent';
    this.view.appendChild(this.scrollViewController.view);
    
    this.rows = null;  
    
    this.loadData = function () {
    
        if (!self.delegate || !self.delegate.cellForIndex) {
            return;
        }
        
        this.scrollViewController.scrollToTop();
        this.cells = [];
        this.containers = [];
        this.height = this.view.element.offsetHeight;
        this.upperIndex = 0;
        this.cellHeight = parseInt(this.cellHeight);
        this.lowerIndex = Math.ceil(this.height / this.cellHeight) - 1;
        
        self.scrollViewController.view.empty();
        
        

        for (var i = 0, l = this.rows; i < l; i++) {
            
            var container = new View();
            container.empty();
            container.index = i;
            container.height = self.cellHeight + 'px';
            self.scrollViewController.view.appendChild(container);
            
            this.containers.push(container);
            
            if (i <= this.lowerIndex) {
                
                self.cellForIndex(i);
            } 
        }
    };
    
}

util.inherits(CollectionViewController, ViewController);

CollectionViewController.prototype.scrollViewDidScroll = function (scrollViewController, position, direction) {
   
    var i = null,
        upperIndex = Math.floor(position / this.cellHeight) - 1,
        lowerIndex = Math.ceil((position + this.height) / this.cellHeight) - 1;
    
    if (direction === 'SCROLL_DIRECTION_DOWN') {
        
        if (upperIndex > this.upperIndex) {
            
            for (i = this.upperIndex; i < upperIndex; i++) {
                this.removeCellForIndex(i);
            }
            this.upperIndex = upperIndex;
        }
        if (lowerIndex > this.lowerIndex) {
            
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

CollectionViewController.prototype.removeCellForIndex = function (index) {
  
    var container = this.containers[index];
    container.empty();
};

CollectionViewController.prototype.cellForIndex = function (index) {
  
    var cell = this.cells[index] || this.delegate.cellForIndex(this, index),
        container = this.containers[index];
    
    if (cell.selected) {
        this.selectedCell = cell; 
        console.log('selected: ' + index);
    }
    
    cell.index = index;
    cell.onClick = this.didPressCellAtIndex.bind(this);
    this.cells.push(cell);

    container.appendChild(cell);
};

CollectionViewController.prototype.didPressCellAtIndex = function (cell, index) {
    
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