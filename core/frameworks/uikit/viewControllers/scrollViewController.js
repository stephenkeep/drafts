var util = require('util'),
    root = __base + 'core/frameworks/uikit/',
    ViewController = require(root + 'viewControllers/viewController'),
    ScrollView = require(root + 'views/scrollView');

function ScrollViewController() {
    var self = this;
    
    ViewController.apply(this, arguments); 
    this.view = new ScrollView();
    this.parentViewController = this;
    
    this.yposition = 0;
    
    this.view.element.onscroll = function() {
        
        var scrollTop = self.view.element.scrollTop,
            direction = 'SCROLL_DIRECTION_DOWN';
        
        if (scrollTop < self.yposition) {
            direction = 'SCROLL_DIRECTION_UP';        
        }
        
        if (self.delegate && self.delegate.scrollViewDidScroll) {
            self.yposition = scrollTop;
            self.delegate.scrollViewDidScroll(this, self.yposition, direction);    
        }

    };

}

util.inherits(ScrollViewController, ViewController);

ScrollViewController.prototype.scrollToTop = function () {
  
    this.yposition = 0;
    this.view.element.scrollTop = 0;
};

module.exports = ScrollViewController;