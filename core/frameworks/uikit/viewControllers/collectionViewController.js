var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ScrollViewController = require(root + 'viewControllers/scrollViewController.js');

function CollectionViewController() {
    ScrollViewController.apply(this, arguments);
    var self = this;
    
    this.rows = null;  
    
    this.loadData = function () {
    
        if (!self.delegate || !self.delegate.cellForIndex) {
            return;
        }
        
        this.view.empty();

        for (var i = 0, l = this.rows; i < l; i++) {

            var cell = self.delegate.cellForIndex(self, i);
            cell.index = i;
            cell.onClick = _didPressCellAtIndex;

            this.view.appendChild(cell);
        }
    };
    
    var _didPressCellAtIndex = function (cell, index) {
        
        if (this.selectedCell) {
            this.selectedCell.selected = false;
        }
        
        this.selectedCell = cell;
        this.selectedCell.selected = true;
        
        if (self.delegate && self.delegate.didPressCellAtIndex) {
            self.delegate.didPressCellAtIndex(self, cell, index);
        } else {
            console.error('didPressCellAtIndex not found');
        }
    };
    
}

util.inherits(CollectionViewController, ScrollViewController);

module.exports = CollectionViewController;