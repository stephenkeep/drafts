var UI = require('core/frameworks/uikit'),
    ActivityCell = require('../views/activityCell');

function ActivityListViewController() {
    UI.ViewController.apply(this, arguments);

    this.title = 'Activities';
    this.view.backgroundColor = '#fffef5';
    
    this.activities = [];
    
}

UI.inherits(ActivityListViewController, UI.ViewController);

var prototype = ActivityListViewController.prototype;

prototype.viewDidLoad = function () {
    
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

prototype.viewWillAppear = function () {
    this.documentCVC.rows = this.activities.length;
    this.documentCVC.loadData();
};

/*
    Collection View Controller Delegate Methods
*/
prototype.cellForIndex = function (cvc, index) {

    var activity = this.activities[index];

    var cell = new ActivityCell();
    cell.title.text = activity.title;
    return cell;
};

prototype.didPressCellAtIndex = function (cvc, cell, index) {
    this.selected = index;
    console.log('index pressed: ' + index);
    
    var newPostViewController = new ActivityListViewController(),
        navigationController = new UI.NavigationViewController(),
        modalViewController = new UI.ModalViewController();
    
    navigationController.setRootViewController(newPostViewController);
    modalViewController.setRootViewController(navigationController);
    
    this.presentModalViewController(modalViewController);
    
    newPostViewController = null;
    navigationController = null;
    modalViewController = null;
};


module.exports = ActivityListViewController;