var UI = require('core/frameworks/uikit');

//Public Methods
function ActivityCell() {
    UI.CollectionCell.apply(this, arguments);
    this.name = 'activityCell';
    
    this.backgroundColor = '#fffef5';
    this.selectedBackgroundColor = '#fffef5';
    
    this.title = new UI.Label();
    this.title.height = '17px';
    this.title.fontSize = '13px';
    this.title.top = '26px'; 
    this.title.left = '22px'; 
    this.title.textColor = '#9CA0AE';
    
    this.appendChild(this.title);
     
    this.line = new UI.View();
    this.line.height = '1px';   
    this.line.backgroundColor = '#ededed';
    this.appendChild(this.line);

}

UI.inherits(ActivityCell, UI.CollectionCell);

var _prototype = ActivityCell.prototype,
    _super = ActivityCell.super_.prototype;

_prototype.destroy = function () {

    this.line.destroy();
    this.line = null;
    this.title.destroy();
    this.title = null;

    _super.destroy.call(this); 
};

module.exports = ActivityCell;