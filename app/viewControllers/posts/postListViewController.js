var UI = require('core/frameworks/uikit'),
    PostCell = require('app/views/posts/postCell'),
    ManagedObjectController = require('app/data/controllers/managedObjectController'),
    Post = require('app/data/models/post'),
    NewPostViewController = require('./newPostViewController');

function PostListViewController() {
    UI.ViewController.apply(this, arguments);

    this.title = '';
    this.view.backgroundColor = '#414446';
    
    this.selected = 0;
    
    this.moc = new ManagedObjectController();
    this.moc.delegate = this;
    window.moc = this.moc;
    
    this.posts = [];
}

UI.inherits(PostListViewController, UI.ViewController);

PostListViewController.prototype.viewDidLoad = function () {
    
    //Setup Collection View to store Documents
    this.documentCVC = new UI.CollectionViewController();
    this.documentCVC.cellHeight = '88px';
    this.documentCVC.view.backgroundColor = '#393b43';
    this.documentCVC.delegate = this;
    this.view.appendChild(this.documentCVC.view);
};

PostListViewController.prototype.rightBarButtonClicked = function () {

    var post = new Post();
    post.title = 'Untitled';
    post.createdAt = new Date();
    post.modifiedAt = new Date();
    this.moc.addObject('Post', post);
    
//    var newPostViewController = new NewPostViewController(),
//        navigationController = new UI.NavigationViewController(),
//        modalViewController = new UI.ModalViewController();
//    
//    navigationController.setRootViewController(newPostViewController);
//    modalViewController.setRootViewController(navigationController);
//    
//    this.presentModalViewController(modalViewController);
};

/*
    Collection View Controller Delegate Methods
*/
PostListViewController.prototype.cellForIndex = function (cvc, index) {

    var post = this.posts[index];
    
    var cell = new PostCell();
    cell.title.text = post.title + ': ' + index;
    if (index === this.selected) {
        cell.selected = true;    
    }
    return cell;
};

PostListViewController.prototype.didPressCellAtIndex = function (cvc, cell, index) {
    this.selected = index;
    console.log('index pressed: ' + index);
};

/*
    Managed Object Controller Delegate Methods
*/
PostListViewController.prototype.objectAdded = function (moc, type, object) {
    
    this.posts.unshift(object);
    
    this.documentCVC.rows = this.posts.length;
    this.documentCVC.loadData();
};

PostListViewController.prototype.objectRemoved = function (moc, type, object) {
    
    var index = this.posts.indexOf(object);
    if (index > -1) {
        this.posts.splice(index, 1);
        this.documentCVC.rows = this.posts.length;
        this.documentCVC.loadData();
    }
};

PostListViewController.prototype.objectUpdated = function (moc, type, object) {
    var index = this.posts.indexOf(object);
    console.log(this.posts[index]);
    this.documentCVC.loadData();
};

module.exports = PostListViewController;