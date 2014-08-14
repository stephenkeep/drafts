var UI = require(__base + 'core/frameworks/uikit');

//Public Methods
function DocumentCell() {
    UI.CollectionCell.apply(this, arguments);
    this.name = 'documentCell';
    
    this.backgroundColor = '#393B43';
    this.selectedBackgroundColor = '#3F424B';
    
    this.title = new UI.Label();
    this.title.height = '17px';
    this.title.fontSize = '13px';
    this.title.top = '26px'; 
    this.title.left = '22px'; 
    this.title.textColor = '#9CA0AE';
    
    this.appendChild(this.title);
     
    this.line = new UI.View();
    this.line.height = '1px';   
    this.line.backgroundColor = '#31333B';
    this.appendChild(this.line);
}

UI.inherits(DocumentCell, UI.CollectionCell);

module.exports = DocumentCell;