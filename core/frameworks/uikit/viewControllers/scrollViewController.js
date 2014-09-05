var util = require('util'),
    ViewController = require('./viewController'),
    ScrollView = require('../views/scrollView');

function ScrollViewController() {
    
    this.view = new ScrollView();
    
    ViewController.apply(this, arguments); 
    
    var self = this;
    
    self.yposition = 0;
    self.scrollEvent = self.view.element.addEventListener('scroll', function () {

        var scrollTop = self.view.element.scrollTop,
            direction = 'SCROLL_DIRECTION_DOWN';

        if (scrollTop < self.yposition) {
            direction = 'SCROLL_DIRECTION_UP';        
        }

        if (self.delegate && self.delegate.scrollViewDidScroll) {
            self.yposition = scrollTop;
            self.delegate.scrollViewDidScroll(this, self.yposition, direction);    
        }
    }, false);
}

util.inherits(ScrollViewController, ViewController);

var _prototype = ScrollViewController.prototype,
    _super = ScrollViewController.super_.prototype;

_prototype.viewDidUnload = function () {
     
    if (this.scrollEvent) {
        this.view.element.removeEventListener(this.scrollEvent);
        this.scrollEvent = null;
    }
    
    this.delegate = null;
    
    _super.viewDidUnload.call(this);
};

_prototype.scrollToTop = function () {
  
    this.yposition = 0;
    this.view.element.scrollTop = 0;
    
    if (this.delegate && this.delegate.scrollViewDidScroll) {
        this.delegate.scrollViewDidScroll(this, this.yposition, 'SCROLL_DIRECTION_UP');    
    }
};

module.exports = ScrollViewController;