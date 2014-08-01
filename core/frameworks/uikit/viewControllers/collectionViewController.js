var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ScrollViewController = require(root + 'viewControllers/scrollViewController.js');

function CollectionViewController() {
    ScrollViewController.apply(this, arguments);
    var self = this;
    
    this.rows = null;  
    
    this.loadData = function () {
    
        if (!this.cellForIndex) {
            return;
        }

        for (var i = 0, l = this.rows; i < l; i++) {

            var cell = this.cellForIndex(i);
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
        
        if (self.didPressCellAtIndex) {
            self.didPressCellAtIndex(cell, index);
        } else {
            console.error('didPressCellAtIndex not found');
        }
    };
    
}

util.inherits(CollectionViewController, ScrollViewController);

module.exports = CollectionViewController;