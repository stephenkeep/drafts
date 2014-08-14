var UI = require(__base + 'core/frameworks/uikit'),
    PostCell = require(__base + 'app/views/posts/postCell'),
    ManagedObjectController = require(__base + 'app/data/controllers/managedObjectController'),
    Post = require(__base + 'app/data/models/post');

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
    
    this.navigationBar.backgroundColor = '#393b43';
    
    //Right Bar Button
    this.rightBarButton = new UI.BarButton();
    this.rightBarButton.backgroundColor = '#393b43';
    this.rightBarButton.onClick = this.rightBarButtonClicked.bind(this);
    this.rightBarButton.icon = 'add2';
    this.rightBarButton.iconColor = '#50CCB2';
    this.navigationBar.rightBarButton = this.rightBarButton;
   
    //Setup Collection View to store Documents
    this.documentCVC = new UI.CollectionViewController();
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
};

/*
    Collection View Controller Delegate Methods
*/
PostListViewController.prototype.cellForIndex = function (cvc, index) {

    var post = this.posts[index];
    
    var cell = new PostCell();
    cell.height = '88px';
    cell.title.text = post.title;
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
    
    console.log(object);
    console.log(this.posts.length);
    
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