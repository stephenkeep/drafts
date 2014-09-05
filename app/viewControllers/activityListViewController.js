var UI = require('core/frameworks/uikit'),
    ActivityCell = require('../views/activityCell'),
    ActivityViewController = require('./activityViewController');

function ActivityListViewController() {
    UI.ViewController.apply(this, arguments);

    this.title = 'Activities';
    this.view.backgroundColor = '#fffef5';
    
    this.activities = [];
    
}

UI.inherits(ActivityListViewController, UI.ViewController);

var _prototype = ActivityListViewController.prototype,
    _super = ActivityListViewController.super_.prototype;

_prototype.viewDidLoad = function () {
    _super.viewDidLoad.call(this); 
    //Setup Collection View to store Documents
    this.documentCVC = new UI.CollectionViewController();
    this.documentCVC.cellHeight = '88px';
    this.documentCVC.view.backgroundColor = '#fffef5';
    this.documentCVC.delegate = this;
    this.view.appendChild(this.documentCVC.view);
    
    for (var i = 0, l = 100; i < l; i++) {
        var activity = {
            title: 'Untitled:' + i
        };  
        this.activities.push(activity);
    }
};

_prototype.viewWillAppear = function () {
    _super.viewWillAppear.call(this); 
    this.documentCVC.rows = this.activities.length;
    this.documentCVC.loadData();
};

_prototype.viewDidUnload = function () {
    
    this.documentCVC.viewDidUnload();
    
    _super.viewDidUnload.call(this); 
};

/*
    Collection View Controller Delegate Methods
*/
_prototype.cellForIndex = function (cvc, index) {

    var activity = this.activities[index];

    var cell = new ActivityCell();
    cell.title.text = activity.title;
    return cell;
};

_prototype.didPressCellAtIndex = function (cvc, cell, index) {
    this.selected = index;

    var activityViewController = new ActivityViewController(),
        navigationController = new UI.NavigationViewController(),
        modalViewController = new UI.ModalViewController();
    
    navigationController.setRootViewController(activityViewController);
    modalViewController.setRootViewController(navigationController);
    
    this.presentModalViewController(modalViewController);
    
    activityViewController = null;
    navigationController = null;
    modalViewController = null;
};


module.exports = ActivityListViewController;