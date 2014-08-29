var util = require('util'),
    ViewController = require('./viewController'),
    ScrollView = require('../views/scrollView');

function ScrollViewController() {
    ViewController.apply(this, arguments); 
    this.view = new ScrollView();
    this.parentViewController = this;
    
    this.yposition = 0;
    this.view.element.addEventListener('scroll', this.onScroll.bind(this), false);    
}

util.inherits(ScrollViewController, ViewController);

ScrollViewController.prototype.scrollToTop = function () {
  
    this.yposition = 0;
    this.view.element.scrollTop = 0;
    
    if (this.delegate && this.delegate.scrollViewDidScroll) {
        this.delegate.scrollViewDidScroll(this, this.yposition, 'SCROLL_DIRECTION_UP');    
    }
};

ScrollViewController.prototype.onScroll = function () {
    var self = this;

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

module.exports = ScrollViewController;