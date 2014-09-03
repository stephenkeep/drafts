var UI = require('core/frameworks/uikit');

function ToolbarViewController() {
    UI.ViewController.apply(this, arguments);
   
    this.view.backgroundColor = '#000';
    this.view.height = '48px';
    this.view.width = '288px';
    
    this.boldButton = new UI.Button();
    this.boldButton.backgroundColor = '#000';
    this.boldButton.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.boldButton.element.setAttribute('data-command-name', 'bold');
    this.boldButton.element.style.float = 'left';
    this.boldButton.titleLabel.text = 'B';
    this.boldButton.iconColor = '#fff';
    this.view.appendChild(this.boldButton);
    
    this.italicButton = new UI.Button();
    this.italicButton.backgroundColor = '#000';
    this.italicButton.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.italicButton.element.setAttribute('data-command-name', 'italic');
    this.italicButton.element.style.float = 'left';
    this.italicButton.titleLabel.text = 'i';
    this.italicButton.iconColor = '#fff';
    this.view.appendChild(this.italicButton);
    
    this.h1Button = new UI.Button();
    this.h1Button.backgroundColor = '#000';
    this.h1Button.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.h1Button.element.setAttribute('data-command-name', 'h1');
    this.h1Button.element.style.float = 'left';
    this.h1Button.titleLabel.text = 'H1';
    this.h1Button.iconColor = '#fff';
    this.view.appendChild(this.h1Button);
    
    this.h2Button = new UI.Button();
    this.h2Button.backgroundColor = '#000';
    this.h2Button.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.h2Button.element.setAttribute('data-command-name', 'h2');
    this.h2Button.element.style.float = 'left';
    this.h2Button.titleLabel.text = 'H2';
    this.h2Button.iconColor = '#fff';
    this.view.appendChild(this.h2Button);
    
    this.linkButton = new UI.Button();
    this.linkButton.backgroundColor = '#000';
    this.linkButton.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.linkButton.element.setAttribute('data-command-name', 'linkPrompt');
    this.linkButton.element.style.float = 'left';
    this.linkButton.icon = 'link';
    this.linkButton.iconColor = '#fff';
    this.view.appendChild(this.linkButton);
    
    this.imageButton = new UI.Button();
    this.imageButton.backgroundColor = '#000';
    this.imageButton.width = '48px';
    //this.boldButton.onClick = _rightBarButtonClicked;
    this.imageButton.element.setAttribute('data-command-name', 'linkPrompt');
    this.imageButton.element.style.float = 'left';
    this.imageButton.icon = 'picture-asset';
    this.imageButton.iconColor = '#fff';
    this.view.appendChild(this.imageButton);
    
}

UI.inherits(ToolbarViewController, UI.ViewController);

module.exports = ToolbarViewController;