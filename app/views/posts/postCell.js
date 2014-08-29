var UI = require('core/frameworks/uikit');

//Public Methods
function PostCell() {
    UI.CollectionCell.apply(this, arguments);
    this.name = 'postCell';
    
    this.backgroundColor = '#393B43';
    this.selectedBackgroundColor = '#3F424B';
    
    this.title = new UI.Label();
    this.title.height = '17px';
    this.title.fontSize = '13px';
    this.title.top = '26px'; 
    this.title.left = '22px'; 
    this.title.textColor = '#9CA0AE';
    
    this.appendChild(this.title);
     
    var line = new UI.View();
    line.height = '1px';   
    line.backgroundColor = '#31333B';
    this.appendChild(line);
    line = null;
}

UI.inherits(PostCell, UI.CollectionCell);

module.exports = PostCell;