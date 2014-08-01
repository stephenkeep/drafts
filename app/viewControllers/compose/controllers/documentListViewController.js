var UI = require(__base + 'core/frameworks/uikit'),
    DocumentCell = require(__base + 'app/viewControllers/compose/views/documentCell');

var _rightBarButtonClicked = function () {
    window.alert('boom!');
};

var _cellForIndex = function (index) {
    var cell = new DocumentCell();
    cell.title.text = 'index: ' + index + ' this is a title that is too long that is not long enough';
    cell.description.text = 'index: ' + index + ' plus a really long description of what is going on here so that we know when to add the ellipses and needs to be a little bit longer so here it is';
    cell.title.textColor = '#E7E7E7';
    cell.description.textColor = '#8E9BA1';
    cell.backgroundColor = '#353839';
    cell.height = '96px';
    return cell;
};

var _didPressCellAtIndex = function (cell, index) {
    console.log('index pressed: ' + index);
};

function ArticleListViewController() {
    UI.ViewController.apply(this, arguments);

    this.title = 'Documents';
    this.view.backgroundColor = '#414446';
}

UI.inherits(ArticleListViewController, UI.ViewController);

ArticleListViewController.prototype.viewDidLoad = function () {

    this.navigationBar.backgroundColor = '#414446';
    this.navigationBar.titleLabel.textColor = '#E7E7E7';
    
    //Right Bar Button
    this.rightBarButton = new UI.BarButton();
    this.rightBarButton.backgroundColor = '#414446';
    this.rightBarButton.onClick = _rightBarButtonClicked;
    this.rightBarButton.icon = 'edit';
    this.rightBarButton.iconColor = '#2ceaf7';
    this.navigationBar.rightBarButton = this.rightBarButton;
   
    //Setup Collection View to store Documents
    this.documentCVC = new UI.CollectionViewController();
    this.documentCVC.view.backgroundColor = '#353839';
    this.documentCVC.cellForIndex = _cellForIndex;
    this.documentCVC.didPressCellAtIndex = _didPressCellAtIndex;
    this.documentCVC.rows = 20;
    this.documentCVC.loadData();
    this.view.appendChild(this.documentCVC.view);
};

module.exports = ArticleListViewController;