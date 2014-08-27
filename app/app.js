var util = require('util'),
    App = require('core/app'),
    UI = require('core/frameworks/uikit'),
    SiteViewController = require('./viewControllers/sites/siteViewController'),
    PageViewController = require('./viewControllers/pages/pageViewController'),
    PostListViewController = require('./viewControllers/posts/postListViewController'),
    ComposeViewController = require('./viewControllers/posts/composeViewController');

function app() {
    App.apply(this, arguments);
}

util.inherits(app, App);

app.prototype.appDidFinishLauncing = function () {
    console.log('applicationDidFinishLaunching');
    
    var siteViewController = new SiteViewController(),
        pageViewController = new PageViewController(),
        postViewController = new UI.SplitViewController(),
        postListViewController = new PostListViewController(),
        composeViewController = new ComposeViewController(),
        tabBarViewController = new UI.TabBarViewController();
    
    //Setup Article List View Controllers
    postListViewController.view.width = '320px';
    postViewController.setLeftViewController(postListViewController);
    postViewController.setRightViewController(composeViewController);
    
    //Setup TabBar View Controllers
    tabBarViewController.tabBar.backgroundColor = '#1D2029';
    tabBarViewController.tabBar.textColor = '#FFFFFF';
    postViewController.title = 'Posts';
    tabBarViewController.addViewController(postViewController);
    pageViewController.title = 'Pages';
    tabBarViewController.addViewController(pageViewController);
    siteViewController.title = 'Sites';
    tabBarViewController.addViewController(siteViewController);
    
    this.setRootViewController(tabBarViewController);
    
    this.themeButton = new UI.Button();
    this.themeButton.backgroundColor = '#50CCB2';
    this.themeButton.width = '118px';
    this.themeButton.text = 'New Post';
    this.themeButton.titleLabel.fontSize = '13px';
    this.themeButton.type = 'rounded';
    this.themeButton.icon = 'compose';
    this.themeButton.textColor = '#286357';
    this.themeButton.element.style.position = 'absolute';
    this.themeButton.element.style.right = '8px';
    tabBarViewController.tabBar.appendChild(this.themeButton);
    
    this.themeButton.onClick = postListViewController.rightBarButtonClicked.bind(postListViewController);

};

module.exports = app;