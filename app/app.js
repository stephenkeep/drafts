var util = require('util'),
    App = require(__base + 'core/app'),
    UI = require(__base + 'core/frameworks/uikit'),
    PageViewController = require(__base + 'app/viewControllers/pages/pageViewController'),
    PostListViewController = require(__base + 'app/viewControllers/posts/postListViewController'),
    ComposeViewController = require(__base + 'app/viewControllers/posts/composeViewController');

function app() {
    App.apply(this, arguments);
}

util.inherits(app, App);

app.prototype.appDidFinishLauncing = function () {
    console.log('applicationDidFinishLaunching');
    
    var pageViewController = new PageViewController(),
        postViewController = new UI.SplitViewController(),
        postListViewController = new PostListViewController(),
        composeViewController = new ComposeViewController(),
        navigationViewController = new UI.NavigationViewController(),
        tabBarViewController = new UI.TabBarViewController();
    
    //Setup Article List View Controllers
    navigationViewController.setRootViewController(postListViewController);
    navigationViewController.view.width = '280px';
    postViewController.setLeftViewController(navigationViewController);
    postViewController.setRightViewController(composeViewController);
    
    
    //Setup TabBar View Controllers
    tabBarViewController.tabBar.backgroundColor = '#1D2029';
    tabBarViewController.tabBar.textColor = '#FFFFFF';
    pageViewController.title = 'Pages';
    tabBarViewController.addViewController(pageViewController);
    postViewController.title = 'Posts';
    tabBarViewController.addViewController(postViewController);
    
    this.setRootViewController(tabBarViewController);
    
    this.themeButton = new UI.Button();
    this.themeButton.backgroundColor = '#50CCB2';
    this.themeButton.width = '100px';
    this.themeButton.titleLabel.text = 'Themes';
    this.themeButton.type = 'rounded';
    this.themeButton.textColor = '#fff';
    tabBarViewController.tabBar.appendChild(this.themeButton);

};

module.exports = app;