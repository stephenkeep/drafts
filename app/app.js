var App = require(__base + 'core/app'),
    RootViewController = require(__base + 'app/viewControllers/composeViewControllers/controllers/rootViewController'),
    ArticleListViewController = require(__base + 'app/viewControllers/composeViewControllers/controllers/articleListViewController'),
    ComposeViewController = require(__base + 'app/viewControllers/composeViewControllers/controllers/composeViewController');

module.exports = App.extend({
    appDidFinishLauncing: function () {
        console.log('applicationDidFinishLaunching');
        
        
        var rootViewController = new RootViewController(),
            articleListViewController = new ArticleListViewController(),
            composeViewController = new ComposeViewController();
        
        rootViewController.setLeftViewController(articleListViewController);
        rootViewController.setRightViewController(composeViewController);

        this.setRootViewController(rootViewController);
    }
});