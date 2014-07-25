var util = require('util'),
    UI = require(__base + 'core/frameworks/uikit');

var _rightBarButtonClicked = function () {
    window.alert('boom!');
};

function ArticleListViewController() {
    UI.ViewController.apply(this, arguments);

    this.view.backgroundColor = '#414446';
    this.view.width = '280px';
    
    this.navigationBar = new UI.NavigationBar();
    this.navigationBar.backgroundColor = '#414446';
    this.navigationBar.title = 'Documents';
    this.navigationBar.titleLabel.textColor = '#E7E7E7';
    
    this.view.appendChild(this.navigationBar);
    
    //Right Bar Button
    this.rightBarButton = new UI.BarButton();
    this.rightBarButton.backgroundColor = '#414446';
    this.rightBarButton.onClick = _rightBarButtonClicked;
    this.rightBarButton.icon = 'edit';
    this.rightBarButton.iconColor = '#2ceaf7';
    this.navigationBar.rightBarButton = this.rightBarButton;
    
}

util.inherits(ArticleListViewController, UI.ViewController);

module.exports = ArticleListViewController;