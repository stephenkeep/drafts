var UI = require(__base + 'core/frameworks/uikit');

//Public Methods
function DocumentCell() {
    UI.CollectionCell.apply(this, arguments);
    this.name = 'documentCell';
    
    this.title = new UI.Label();
    this.title.height = '25%'; 
    this.title.top = '4px'; 
    this.title.left = '8px'; 
    this.appendChild(this.title);
    
    this.description = new UI.Label();
    this.description.height = '68px';
    this.description.top = '28px';
    this.description.left = '8px';
    this.description.numberOfLines = 3;
    this.appendChild(this.description);
    
    this.line = new UI.View();
    this.line.height = '1px';   
    this.line.backgroundColor = 'rgba(255,255,255,0.1)';
    this.appendChild(this.line);
}

UI.inherits(DocumentCell, UI.CollectionCell);

module.exports = DocumentCell;