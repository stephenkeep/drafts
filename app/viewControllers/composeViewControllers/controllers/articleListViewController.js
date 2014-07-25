var util = require('util'),
    UI = require(__base + 'core/frameworks/uikit');

function ArticleListViewController() {
    UI.ViewController.apply(this, arguments);

    this.view.backgroundColor = '#414446';
    this.view.width = '280px';
    
    this.navigationBar = new UI.NavigationBar();
    this.navigationBar.backgroundColor = '#414446';
    this.navigationBar.title = 'Documents';
    this.navigationBar.titleLabel.textColor = '#E7E7E7';
    
    this.view.appendChild(this.navigationBar);
}

util.inherits(ArticleListViewController, UI.ViewController);

module.exports = ArticleListViewController;