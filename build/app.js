(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('util'),
    App = require('core/app'),
    UI = require('core/frameworks/uikit'),
    ActivityListViewController = require('./viewControllers/activityListViewController');

function app() {
    App.apply(this, arguments);
}

util.inherits(app, App);

app.prototype.appDidFinishLauncing = function () {
    
    var activityListViewController = new ActivityListViewController(),
        navigationViewController = new UI.NavigationViewController();
    
    navigationViewController.setRootViewController(activityListViewController);
    
    this.setRootViewController(navigationViewController);
    
    navigationViewController.navigationBar.borderColor = 'rgb(213, 213, 213)';
    navigationViewController.navigationBar.titleLabel.textColor = '#ffffff';
    navigationViewController.navigationBar.backgroundColor = '#d46931';
     
    activityListViewController = null;
};

module.exports = app;
},{"./viewControllers/activityListViewController":2,"core/app":30,"core/frameworks/uikit":31,"util":29}],2:[function(require,module,exports){
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
},{"../views/activityCell":3,"core/frameworks/uikit":31}],3:[function(require,module,exports){
var UI = require('core/frameworks/uikit');

//Public Methods
function ActivityCell() {
    UI.CollectionCell.apply(this, arguments);
    this.name = 'activityCell';
    
    this.backgroundColor = '#fffef5';
    this.selectedBackgroundColor = '#fffef5';
    
    this.title = new UI.Label();
    this.title.height = '17px';
    this.title.fontSize = '13px';
    this.title.top = '26px'; 
    this.title.left = '22px'; 
    this.title.textColor = '#9CA0AE';
    
    this.appendChild(this.title);
     
    var line = new UI.View();
    line.height = '1px';   
    line.backgroundColor = '#ededed';
    this.appendChild(line);
}

UI.inherits(ActivityCell, UI.CollectionCell);

var _prototype = ActivityCell.prototype,
    _super = ActivityCell.super_.prototype;

_prototype.unload = function () {

    this.line.unload();
    this.title.unload();

    _super.unload.call(this); 
};

module.exports = ActivityCell;
},{"core/frameworks/uikit":31}],4:[function(require,module,exports){
var util = require('util'),
    ViewController = require('./viewController.js'),
    ScrollViewController = require('./scrollViewController.js');

function CollectionViewController() {
    ViewController.apply(this, arguments);

    this.scrollViewController = new ScrollViewController();
    this.scrollViewController.delegate = this;
    this.scrollViewController.view.backgroundColor = 'transparent';
    this.view.appendChild(this.scrollViewController.view);
    
    this.rows = null;  
    this.cells = [];
    this.containers = [];
    
    this.height = 0;
    this.upperIndex = 0;
    this.cellHeight = 0;
    this.lowerIndex = 0;
}

util.inherits(CollectionViewController, ViewController);

CollectionViewController.prototype.loadData = function () {
    var self = this;
    
    if (!this.delegate || !this.delegate.cellForIndex) {
        return;
    }

    this.scrollViewController.scrollToTop();
    this.height = this.view.element.offsetHeight;
    this.upperIndex = 0;
    this.cellHeight = parseInt(this.cellHeight);
    this.lowerIndex = Math.ceil(this.height / this.cellHeight) - 1;

    var l = this.rows - this.cells.length; 
    
    var initialCellCount = this.cells.length;

    for (var i = 0; i < l; i++) {

        var index = initialCellCount + i,
            cell = this.delegate.cellForIndex(this, index);
        
        if (cell.selected) {
            this.selectedCell = cell; 
        }

        cell.index = index;   
        cell.height = self.cellHeight + 'px';
        
        cell.onClick = this.didPressCellAtIndex.bind(this);
        
        this.containers.push(cell.element.childNodes[0].cloneNode(true));
        if (index > this.lowerIndex) {
            cell.empty();
        }
        
        this.cells.push(cell);
        self.scrollViewController.view.appendChild(cell);
    }
};

CollectionViewController.prototype.scrollViewDidScroll = function (scrollViewController, position, direction) {
   
    var i = null,
        upperIndex = Math.floor(position / this.cellHeight) - 1,
        lowerIndex = Math.ceil((position + this.height) / this.cellHeight) - 1;
    
    if (direction === 'SCROLL_DIRECTION_DOWN') {
        
        if (upperIndex >= this.upperIndex) {
            
            for (i = this.upperIndex; i <= upperIndex; i++) {
                this.removeCellForIndex(i);
            }
            this.upperIndex = upperIndex;
        }
        if (lowerIndex >= this.lowerIndex) {
            
            for (i = this.lowerIndex + 1; i <= lowerIndex; i++) {
                this.cellForIndex(i);     
            }
            this.lowerIndex = lowerIndex;
        }
        
    } else {
        
        if (upperIndex < this.upperIndex) {

            var uIndex = upperIndex < 0 ? 0 : upperIndex;
            for (i = this.upperIndex; i >= uIndex; i--) {
                this.cellForIndex(i);
            }
            this.upperIndex = uIndex;
        }
        if (lowerIndex < this.lowerIndex) {
            
            for (i = this.lowerIndex; i > lowerIndex; i--) {
                this.removeCellForIndex(i);
            }
            this.lowerIndex = lowerIndex;
        }
    }
};

CollectionViewController.prototype.cellForIndex = function (index) {
  
    if (index < this.cells.length) {
        var cell = this.cells[index],
            container = this.containers[index];
    
        cell.element.appendChild(container);
    }

};

CollectionViewController.prototype.removeCellForIndex = function (index) {
   
    if (index < this.cells.length) {
        var cell = this.cells[index];
        cell.empty();
    }
};

CollectionViewController.prototype.didPressCellAtIndex = function (cell, index) {
    
    if (this.selectedCell) {
        this.selectedCell.selected = false;
    }

    this.selectedCell = cell;
    this.selectedCell.selected = true;

    if (this.delegate && this.delegate.didPressCellAtIndex) {
        this.delegate.didPressCellAtIndex(this, cell, index);
    } else {
        console.error('didPressCellAtIndex not found');
    }
};

module.exports = CollectionViewController;
},{"./scrollViewController.js":8,"./viewController.js":11,"util":29}],5:[function(require,module,exports){
var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController.js');

function ModalViewController() {
    ViewController.apply(this, arguments); 
    var self = this;
    
    this.view.backgroundColor = 'transparent';
    this.view.element.style.zIndex = '9999999999';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '0px';
    this.view.element.style.left = '0px';
    this.view.element.style.pointerEvents = 'fill';
    
    this.viewEvent = this.view.element.addEventListener('click', function _func(e) {
        //if (e.target === self.view.element) {
            self.view.element.removeEventListener(self.viewEvent);
            self.viewEvent = null;
            self.dismissModalViewController();
        //}
    }, false);
    
    this.container = new View();
    this.container.element.style['-webkit-transition-duration'] = '250ms';
    this.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';
    this.view.appendChild(this.container);
    
    // create an observer instance
    this.observer = new window.MutationObserver(this.viewMutated.bind(this));
    this.observer.observe(this.container.element, { childList: true });
}


util.inherits(ModalViewController, ViewController);

var _prototype = ModalViewController.prototype,
    _super = ModalViewController.super_.prototype;

_prototype.viewMutated = function(mutations) {
    
    var self = this;

    mutations.forEach(function(mutation) {
        
        if (mutation.addedNodes !== null && 
            mutation.addedNodes.length > 0 && 
            mutation.addedNodes[0].parentView && 
            mutation.addedNodes[0].parentView.parentViewController) {

            self.viewWillAppear();
             
            self.container.element.addEventListener('webkitTransitionEnd', function _func() {
                self.container.element.removeEventListener('webkitTransitionEnd', _func);
                
                self.viewDidAppear();
                
            }, false);
                          
            self.container.element.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
            
            self.observer.disconnect();
            self.observer = null;
        }
    });    
};

_prototype.viewWillAppear = function () {
    _super.viewWillAppear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewWillAppear) {
        this.rootViewController.viewWillAppear();    
    }

};

_prototype.viewDidAppear = function () {
    _super.viewDidAppear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewDidAppear) {
        this.rootViewController.viewDidAppear();    
    }

};

_prototype.viewWillDisappear = function () {
    _super.viewWillDisappear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewWillDisappear) {
        this.rootViewController.viewWillDisappear();    
    }

};

_prototype.viewDidDisappear = function () {
    _super.viewDidDisappear.call(this); 
    
    if (this.rootViewController && this.rootViewController.viewDidDisappear) {
        this.rootViewController.viewDidDisappear();    
    }

};

_prototype.viewDidUnload = function () {
    _super.viewDidUnload.call(this); 
    
    if (this.viewEvent) {
        this.view.element.removeEventListener(this.viewEvent);
        this.viewEvent = null;
    }
    
    if (this.observer) {
        this.observer.disconnect();
        this.observer = null;    
    }

    if (this.rootViewController && this.rootViewController.viewDidUnload) {
        this.rootViewController.viewDidUnload();    
    }

    this.rootViewController.parentViewController = null;
    this.rootViewController = null;
};

_prototype.setRootViewController = function (viewController) {
    
    this.rootViewController = viewController;
    this.container.appendChild(this.rootViewController.view);
    this.rootViewController.parentViewController = this;
};

_prototype.dismissModalViewController = function () {
    
    var self = this;
    
    self.container.element.addEventListener('webkitTransitionEnd', function _func() {
        
        self.container.element.removeEventListener('webkitTransitionEnd', _func);
        
        self.viewDidDisappear();
        self.viewDidUnload();
        
    }, false);
    
    self.viewWillDisappear();

    self.container.element.style['-webkit-transform'] = 'translate3d(0px, 100%, 0px)';        
};


module.exports = ModalViewController;
},{"./viewController.js":11,"core/frameworks/uikit/views/view.js":32,"util":29}],6:[function(require,module,exports){
var util = require('util'),
    View = require('core/frameworks/uikit/views/view.js'),
    ViewController = require('./viewController'),
    NavigationView = require('../views/navigationView'),
    NavigationBar = require('../views/navigationBar');

function NavigationViewController() {
    ViewController.apply(this, arguments); 
    this.view = new NavigationView();
    this.view.parentViewController = this;
    
    this.currentViewController = null;
    
    if (window.iOS) {
        this.statusBar = new View();
        this.statusBar.element.style.zIndex = '1001';
        this.statusBar.height = '20px';
        this.statusBar.backgroundColor = '#d46931';
        this.view.appendChild(this.statusBar);
    }
    
    this.navigationBar = new NavigationBar();
    this.navigationBar.element.style.zIndex = '1000';
    
    this.controllerView = new View();
    this.controllerView.element.style.flex = '1';
    
    this.view.appendChild(this.navigationBar);
    this.view.appendChild(this.controllerView);
    
    // create an observer instance
    this.observer = new window.MutationObserver(this.viewMutated.bind(this));
    this.observer.observe(this.controllerView.element, { childList: true });
}

util.inherits(NavigationViewController, ViewController);

NavigationViewController.prototype.viewMutated = function(mutations) {
    
    var self = this;

    mutations.forEach(function(mutation) {
        
        console.log(mutation);

        if (mutation.addedNodes !== null && 
            mutation.addedNodes.length > 0 && 
            mutation.addedNodes[0].parentView && 
            mutation.addedNodes[0].parentView.parentViewController) {

            var viewController = mutation.addedNodes[0].parentView.parentViewController;
            if (viewController.viewWillAppear) {
                viewController.viewWillAppear();    
            }
             
            if (viewController === this.rootViewController) {
                if (viewController.viewDidAppear) {
                    viewController.viewDidAppear();    
                }
            }
            
            self.observer.disconnect();
            self.observer = null;
        }
    });    
};

NavigationViewController.prototype.setRootViewController = function (viewController) {
        
    this.rootViewController = viewController;
    this.rootViewController.view.element.style.position = 'absolute';
    this.navigationBar.title = this.rootViewController.title;
    this.rootViewController.navigationBar = this.navigationBar;
    this.controllerView.appendChild(this.rootViewController.view);
    
    this.currentViewController = this.rootViewController;
    
    this.rootViewController.parentViewController = this;
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

NavigationViewController.prototype.viewWillAppear = function () {

    if (this.currentViewController && this.currentViewController.viewWillAppear) {
        this.currentViewController.viewWillAppear();    
    }
};

NavigationViewController.prototype.viewDidAppear = function () {

    if (this.currentViewController && this.currentViewController.viewDidAppear) {
        this.currentViewController.viewDidAppear();    
    }
};

NavigationViewController.prototype.viewDidDisappear = function () {
    
    if (this.currentViewController && this.currentViewController.viewDidDisappear) {
        this.currentViewController.viewDidDisappear();    
    }

};

NavigationViewController.prototype.viewDidUnload = function () {
    NavigationViewController.super_.prototype.viewDidUnload.call(this); 
    
    if (this.currentViewController && this.currentViewController.viewDidUnload) {
        this.currentViewController.viewDidUnload();  
    }
    
    this.currentViewController = null;
    this.rootViewController = null;
    
    this.navigationBar.unload();
    this.navigationBar = null;
    this.controllerView.unload();
    this.controllerView = null;

    if (window.iOS) {
        this.statusBar.unload();
        this.statusBar = null;
    }
};

module.exports = NavigationViewController;
},{"../views/navigationBar":16,"../views/navigationView":17,"./viewController":11,"core/frameworks/uikit/views/view.js":32,"util":29}],7:[function(require,module,exports){
var util = require('util'),
    ViewController = require('./viewController'),
    View = require('../views/view');

function PopOverViewController() {
    ViewController.apply(this, arguments); 

    this.view.backgroundColor = 'transparent';
    this.view.height = '30px';
    this.view.width = '30px';
    this.view.element.style.overflow = 'visible';
    this.view.element.style.zIndex = '1000';
    this.view.element.style.position = 'absolute';
    this.view.element.style.top = '200px';
    this.view.element.style.left = '200px';
    
    this.arrow = new View();
    this.arrow.backgroundColor = 'transparent';
    this.arrow.width = 'initial';
    this.arrow.height = 'initial';
    this.arrow.element.style.borderTop = '7px solid #000';
    this.arrow.element.style.borderRight = '7px solid transparent';
    this.arrow.element.style.borderLeft = '7px solid transparent';
    this.arrow.element.style.bottom = '35px';
    this.arrow.element.style.display = 'block';
    this.arrow.element.style.left = '50%';
    this.arrow.element.style.marginLeft = '-7px';
    this.arrow.element.style.position = 'absolute';
    this.view.appendChild(this.arrow);
    
    this.content = new View();
    this.content.element.style.overflow = 'hidden';
    this.content.element.style.borderRadius = '4px';
    this.content.element.style.boxShadow = '1px 1px 20px rgba(0,0,0,0.4)';
    this.content.element.style.position = 'absolute';
    this.content.element.style.bottom = '42px';
    this.content.element.style.left = '-85px';
    this.content.element.style.display = 'block';
    this.content.backgroundColor = '#000';
    this.content.height = '48px';
    this.content.width = '200px';
    this.view.appendChild(this.content);

}

util.inherits(PopOverViewController, ViewController);

PopOverViewController.prototype.setRootViewController = function (viewController) {
    this.rootViewController = viewController;
    
    var width = parseInt(this.rootViewController.view.width);
    width = (width / 2) - 15;
    
    this.content.element.style.left = '-' + width + 'px'; 
    this.content.width = this.rootViewController.view.width;
    this.content.appendChild(this.rootViewController.view);
    
    this.rootViewController.parentViewController = this;
    if (this.rootViewController.viewDidLoad) {
        this.rootViewController.viewDidLoad();    
    }
};

PopOverViewController.prototype.setXYPosition = function (x, y) {
    this.view.element.style.top = y + 'px';
    this.view.element.style.left = x - 15 + 'px';
};

PopOverViewController.prototype.hide = function () {
    this.view.element.style.display = 'none';
};

PopOverViewController.prototype.show = function () {
    this.view.element.style.display = 'initial';
};

module.exports = PopOverViewController;
},{"../views/view":22,"./viewController":11,"util":29}],8:[function(require,module,exports){
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
},{"../views/scrollView":18,"./viewController":11,"util":29}],9:[function(require,module,exports){
var util = require('util'),
    ViewController = require('./viewController.js');

function SplitViewController() {
    ViewController.apply(this, arguments); 
    this.view.element.style.display = '-webkit-flex';
}

util.inherits(SplitViewController, ViewController);

SplitViewController.prototype.setLeftViewController = function (viewController) {
    this.leftViewController = viewController;
    this.leftViewController.view.element.style.flex = '1';
    this.view.appendChild(this.leftViewController.view);
    
    this.leftViewController.parentViewController = this;
    if (this.leftViewController.viewDidLoad) {
        this.leftViewController.viewDidLoad();    
    }
};

SplitViewController.prototype.setRightViewController = function (viewController) {
    this.rightViewController = viewController;
    this.rightViewController.view.element.style.flex = '1';
    this.view.appendChild(this.rightViewController.view);
    
    this.rightViewController.parentViewController = this;
    if (this.rightViewController.viewDidLoad) {
        this.rightViewController.viewDidLoad();    
    }
};

module.exports = SplitViewController;
},{"./viewController.js":11,"util":29}],10:[function(require,module,exports){
var util = require('util'),
    ViewController = require('./viewController'),
    View = require('../views/view'),
    TabView = require('../views/tabView'),
    TabBar = require('../views/tabBar'),
    TabBarButton = require('../views/tabBarButton');

function TabBarViewController() {
    ViewController.apply(this, arguments);
    this.parentViewController = this;
    this.view = new TabView();
    
    this.selectedIndex = 0;
    this.zindex = 10000;
    
    this.tabBar = new TabBar();
    this.view.appendChild(this.tabBar);
    
    this.viewControllerContainer = new View();
    this.viewControllerContainer.height = '-webkit-calc(100% - ' + this.tabBar.height + ')';
    this.view.appendChild(this.viewControllerContainer);
    
    this.viewControllers = [];
    this.tabBarButtons = [];
}

util.inherits(TabBarViewController, ViewController);

TabBarViewController.prototype.addViewController = function (viewController) {
    
    var zindex = this.zindex - this.viewControllers.length;
    
    this.viewControllers.push(viewController);
    viewController.view.element.style.position = 'absolute';
    viewController.view.element.style.top = '0px';
    viewController.view.element.style.left = '0px';
    viewController.view.element.style.zIndex = zindex;
    this.viewControllerContainer.appendChild(viewController.view);
    
    var tabBarButton = new TabBarButton();
    tabBarButton.text = viewController.title;
    tabBarButton.tabBarViewController = this;
    tabBarButton.index = this.viewControllers.length - 1;
    tabBarButton.backgroundColor = this.tabBar.backgroundColor;
    tabBarButton.textColor = this.tabBar.textColor;
    if (this.tabBarButtons.length === 0) {
        tabBarButton.selected = true;
    } else {
        tabBarButton.selected = false;
    }
    this.tabBar.appendChild(tabBarButton);
    this.tabBarButtons.push(tabBarButton);
};

TabBarViewController.prototype.didPressTabBarButton = function (tabBarButton) {
    
    var selectedIndex = tabBarButton.index;
    
    
    if (selectedIndex !== this.selectedIndex) {
        
        this.selectedIndex = selectedIndex;
        var i = 0, l = 0;
        //reorder the z-index on the viewControllers
        for (i = 0, l = this.viewControllers.length; i < l; i++) {

            var zindex = this.zindex - (i + 1);
            var vc = this.viewControllers[i];
        
            if (i === selectedIndex) {
                
                vc.view.element.style.zIndex = zindex + l + 1; 
                
            } else if (vc.view.element.style.zIndex !== zindex) {
                
                vc.view.element.style.zIndex = zindex;     
            }
        }
        
        //set the correct selected tabbarbutton
        for (i = 0, l = this.tabBarButtons.length; i < l; i++) {
            var tb = this.tabBarButtons[i];
            if (tb.selected) {
                tb.selected = false;
            }
        }
        tabBarButton.selected = true;
    }
};

module.exports = TabBarViewController;
},{"../views/tabBar":19,"../views/tabBarButton":20,"../views/tabView":21,"../views/view":22,"./viewController":11,"util":29}],11:[function(require,module,exports){
var View = require('../views/view.js');

function ViewController() {
    this.name = 'viewController';
    this.view = new View();
    this.view.parentViewController = this;
}

ViewController.prototype.viewDidLoad = function () {

};

ViewController.prototype.viewWillAppear = function () {

};

ViewController.prototype.viewDidAppear = function () {

};

ViewController.prototype.viewWillDisappear = function () {
    
};

ViewController.prototype.viewDidDisappear = function () {
    
};

ViewController.prototype.viewDidUnload = function () {
    
    this.view.parentViewController = this;
    this.view.unload();
    this.view = null;
    this.name = null;
};

ViewController.prototype.presentModalViewController = function (modalViewController) {
 
    window.document.body.appendChild(modalViewController.view.element);
    
    if (modalViewController.viewDidLoad) {
        modalViewController.viewDidLoad();    
    }
};

module.exports = ViewController;
},{"../views/view.js":22}],12:[function(require,module,exports){
var util = require('util'),
    View = require('./view'),
    Label = require('./label');

var element = function () {
    
    var el = document.createElement('ui-barbutton');
    el.style.maxHeight = '48px';
    el.style.minHeight = '48px';
    el.style.minWidth = '48px';
    el.style.pointerEvents = 'fill';
    return el;
};

function BarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();

    //SETUP INHERITED PROPERTIES
    this.height = '48px';
    this.width = '48px';
    
    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.appendChild(this.titleLabel);
    
    //CUSTOM MOUSE EVENTS
    this.element.onmouseover = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    this.element.onmouseout = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    
    //CUSTOM PROPERTIES
    var onClick,
        icon,
        iconColor;
        
    Object.defineProperty(this, 'onClick', {
        get: function() {
          return onClick;
        },
        set: function(newValue) {
           onClick = newValue;
           this.element.onclick = newValue;
        }
    });
    
    Object.defineProperty(this, 'icon', {
        get: function() {
          return icon;
        },
        set: function(newValue) {
           icon = newValue;
           this.titleLabel.textElement.className = 'icon-' + newValue;
        }
    });
    
    Object.defineProperty(this, 'iconColor', {
        get: function() {
          return iconColor;
        },
        set: function(newValue) {
           iconColor = newValue;
           this.titleLabel.textColor = newValue;
        }
    });
}

util.inherits(BarButton, View);

module.exports = BarButton;
},{"./label":15,"./view":22,"util":29}],13:[function(require,module,exports){
var util = require('util'),
    View = require('./view'),
    Label = require('./label');

var element = function () {
    
    var el = document.createElement('ui-button');
    el.style.pointerEvents = 'fill';
    el.style.position = 'relative';
    el.style.minHeight = '48px';
    el.style.minWidth = '48px';
    el.style.border = '0px';
    el.style.padding = '0px';
    el.style.margin = '0px';
    return el;
};

function BarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();
    
    this.content = new View();
    this.content.backgroundColor = 'transparent';
    this.appendChild(this.content);
    
    this.iconLabel = new Label();
    this.iconLabel.textElement.style.font = 'font-family: "icons"';
    this.iconLabel.textElement.style.fontSize = '17px';
    this.iconLabel.textAlign = 'center';
    this.iconLabel.textVerticalAlign = 'center';
    this.content.appendChild(this.iconLabel);

    this.titleLabel = new Label();
    this.titleLabel.textElement.style.lineHeight = '40px';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.content.appendChild(this.titleLabel);
    
    //CUSTOM MOUSE EVENTS
    var _backgroundColor = this.backgroundColor,
        _iconColor = self.iconColor || self.textColor;
//    this.element.onmouseover = function () {
//        
//        self.content.backgroundColor = _iconColor;
//        self.titleLabel.textColor = _backgroundColor;
//        self.iconLabel.textColor = _backgroundColor;
//    };
//    this.element.onmouseout = function () {
//
//        self.content.backgroundColor = _backgroundColor;
//        self.titleLabel.textColor = _iconColor;
//        self.iconLabel.textColor = _iconColor;
//    };
    
    //CUSTOM PROPERTIES
    var onClick,
        icon,
        text,
        textColor,
        type;
    
    Object.defineProperty(this, 'type', {
        get: function() {
          return type;
        },
        set: function(newValue) {
            type = newValue;
            if (type === 'rounded') {
                _backgroundColor =  this.backgroundColor;
                this.content.backgroundColor = this.backgroundColor;
                this.content.height = '-webkit-calc(100% - 10px)';
                this.content.element.style.borderRadius = '3px';
                this.element.style.marginTop = '5px';
                this.backgroundColor = 'transparent';
            }
        }
    });
        
    Object.defineProperty(this, 'onClick', {
        get: function() {
          return onClick;
        },
        set: function(newValue) {
           onClick = newValue;
           this.clickEvent = this.element.addEventListener('click', _onClick, false);  
        }
    });
    
    Object.defineProperty(this, 'icon', {
        get: function() {
          return icon;
        },
        set: function(newValue) {
            icon = newValue;
            this.iconLabel.textElement.className = 'icon-' + newValue;
            this.iconLabel.element.style.top = '-1px';
            this.titleLabel.width = '-webkit-calc(100% - 38px)';
            this.titleLabel.element.style.left = '32px'; 
        }
    });
    
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
            text = newValue;
            this.titleLabel.text = newValue;
            this.iconLabel.width = '44px';
        }
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
            _iconColor = newValue;
            textColor = newValue;
            this.titleLabel.textColor = newValue;
        }
    });
    
    //PRIVATE METHODS
    var _onClick = function () {
        
        onClick(self);        
    };
}

util.inherits(BarButton, View);

BarButton.prototype.unload = function () {
    
    this.element.removeEventListener(this.clickEvent);
    this.element = null;
};

module.exports = BarButton;
},{"./label":15,"./view":22,"util":29}],14:[function(require,module,exports){
var util = require('util'),
    View = require('./view.js'),
    Label = require('./label.js');

var element = function () {
    
    var el = document.createElement('ui-collectioncell');
    el.style.position = 'relative';
    el.style.pointerEvents = 'fill';
    return el;
};

var container = function () {
    
    var el = document.createElement('ui-collectioncellcontainer');
    return el;
};

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

function CollectionCell() {
    View.apply(this, arguments);
    
    this.element = element();
    this.container = container();
    this.element.appendChild(this.container);
    
    var self = this;
    self.backgroundColor = '#FFF';
    
    //CUSTOM MOUSE EVENTS
   var _backgroundColor;
//    this.element.onmouseover = function () {
//        if (!selected) {
//            if (!_backgroundColor) {
//                _backgroundColor = self.backgroundColor;
//            }
//            self.backgroundColor = blendColors(_backgroundColor, '#000000', 0.1);
//        }
//    };
//    this.element.onmouseout = function () {
//        if (!selected) {
//            self.backgroundColor = _backgroundColor;
//        }
//    };
    
    //CUSTOM PROPERTIES
    var onClick,
        selected;
        
    Object.defineProperty(this, 'onClick', {
        get: function() {
          return onClick;
        },
        set: function(newValue) {
            onClick = newValue;
            if (this.element) {
                this.clickEvent = this.element.addEventListener('click', _onClick, false);    
            }
        }
    });
    
    Object.defineProperty(this, 'selected', {
        get: function() {
          return selected;
        },
        set: function(newValue) {
           selected = newValue;
           if (selected) {
               if (!_backgroundColor) {
                   _backgroundColor = self.backgroundColor;
               }
               if (this.selectedBackgroundColor) {
                   self.backgroundColor = this.selectedBackgroundColor;
               } else {
                   self.backgroundColor = blendColors(_backgroundColor, '#000000', 0.2);
               }
            } else {
                self.backgroundColor = _backgroundColor;
            }
        }
    });
    

    //PRIVATE METHODS
    var _onClick = function () {
        
        onClick(self, self.index);        
    };
}

util.inherits(CollectionCell, View);

var _prototype = CollectionCell.prototype,
    _super = CollectionCell.super_.prototype;

_prototype.unload = function () {

    this.container.unload();
    this.element.removeEventListener(this.clickEvent);
     
    _super.unload.call(this); 
};

_prototype.appendChild = function (child) {
    
    this.container.appendChild(child.element);
    
};

module.exports = CollectionCell;
},{"./label.js":15,"./view.js":22,"util":29}],15:[function(require,module,exports){
var util = require('util'),
    View = require('./view.js');

var element = function () {
    
    var el = document.createElement('ui-label');
    el.style.backgroundColor = 'transparent';
    el.style.display = 'block';
    el.style.pointerEvents = 'none';
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.left = '0';
    return el;
};

var _text = function () {
    
    var el = document.createElement('p');
    el.style.height = '100%';
    el.style.textOverflow = 'ellipsis';
    el.style.display = '-webkit-box';
    el.style['-webkit-line-clamp'] = '1';
    el.style['-webkit-box-orient'] = 'vertical';
    return el;
};

function Label() {
    View.apply(this, arguments);
    this.element = element();
    
    this.textElement = _text();
    this.element.appendChild(this.textElement);
    
    var top,
        left,
        text,
        textColor,
        textAlign,
        fontSize,
        numberOfLines,
        textVerticalAlign = null;
    
    Object.defineProperty(this, 'top', {
        get: function() {
            return top;
        },
        set: function(newValue) {
            top = newValue;
            if (this.element) {
                this.element.style.top = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'left', {
        get: function() {
          return left;
        },
        set: function(newValue) {
           left = newValue;
            if (this.element) {
                this.element.style.left = newValue;
            }
           this.width = '-webkit-calc(100% - ' + newValue + ' - ' + newValue + ')';
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
            text = newValue;
            if (this.textElement) {
                this.textElement.textContent = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
            if (this.textElement) {
                this.textElement.style.color = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textAlign', {
        get: function() {
          return textAlign;
        },
        set: function(newValue) {
           textAlign = newValue;
            if (this.textElement) {
                this.textElement.style.textAlign = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'fontSize', {
        get: function() {
          return fontSize;
        },
        set: function(newValue) {
           fontSize = newValue;
            if (this.textElement) {
                this.textElement.style.fontSize = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'textVerticalAlign', {
        get: function() {
          return textVerticalAlign;
        },
        set: function(newValue) {
            textVerticalAlign = newValue;
            if (this.textElement) {
                this.textElement.style['-webkit-box-pack'] = newValue;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'numberOfLines', {
        get: function() {
          return numberOfLines;
        },
        set: function(newValue) {
            numberOfLines = newValue;
            if (this.textElement) {
                this.textElement.style['-webkit-line-clamp'] = newValue;
            }
        },
        enumerable: true
    });
}

util.inherits(Label, View);

var _prototype = Label.prototype,
    _super = Label.super_.prototype;


module.exports = Label;
},{"./view.js":22,"util":29}],16:[function(require,module,exports){
var util = require('util'),
    View = require('./view'),
    Label = require('./label');

var element = function () {
    
    var el = document.createElement('ui-navigationbar');
    return el;
};

function NavigationBar() {
    View.apply(this, arguments);
    this.element = element();
    
    this.height = '48px';

    this.titleLabel = new Label();
    this.titleLabel.element.style.position = 'absolute';
    this.titleLabel.element.style.top = '0';
    this.titleLabel.element.style.left = '0';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.textVerticalAlign = 'center';
    this.appendChild(this.titleLabel);

    var title;

    
    Object.defineProperty(this, 'title', {
        get: function() {
          return title;
        },
        set: function(newValue) {
           title = newValue;
           this.titleLabel.text = newValue;
        }
    });
    
//        leftBarButton,
//        rightBarButton;
//    Object.defineProperty(this, 'leftBarButton', {
//        get: function() {
//          return leftBarButton;
//        },
//        set: function(newValue) {
//           leftBarButton = newValue;
//           this.appendChild(newValue);
//        }
//    });
//    
//    Object.defineProperty(this, 'rightBarButton', {
//        get: function() {
//          return rightBarButton;
//        },
//        set: function(newValue) {
//            rightBarButton = newValue;
//            this.appendChild(rightBarButton);
//        }
//    });
}

util.inherits(NavigationBar, View);

var _prototype = NavigationBar.prototype,
    _super = NavigationBar.super_.prototype;

_prototype.unload = function () {

    this.titleLabel.unload();
     
    _super.unload.call(this); 
};

module.exports = NavigationBar;
},{"./label":15,"./view":22,"util":29}],17:[function(require,module,exports){
var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    
    var el = document.createElement('ui-navigationview');
    el.style.display = '-webkit-flex';
    el.style['-webkit-flex-direction'] = 'column';
    return el;
};

//Public Methods
function NavigationView() {
    View.apply(this, arguments);
    this.element = element();
    this.element.parentView = this;
    this.name = 'navigationView';
    
}

util.inherits(NavigationView, View);

module.exports = NavigationView;
},{"./view":22,"util":29}],18:[function(require,module,exports){
var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    
    var el = document.createElement('ui-scrollview');
    el.style.overflowY = 'scroll';
    return el;
};

//Public Methods
function ScrollView() {
    View.apply(this, arguments);
    this.element = element();
    this.element.parentView = this;
    this.name = 'scrollView';
    
}

util.inherits(ScrollView, View);

module.exports = ScrollView;
},{"./view":22,"util":29}],19:[function(require,module,exports){
var util = require('util'),
    View = require('./view');

var element = function () {
    var el = document.createElement('ui-tabbar');
    el.style.display = '-webkit-flex';
    return el;
};

function TabBar() {
    View.apply(this, arguments);
    this.element = element();
    
    this.height = '48px';
    
    var textColor;
            
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
        }
    });
}

util.inherits(TabBar, View);


module.exports = TabBar;
},{"./view":22,"util":29}],20:[function(require,module,exports){
var util = require('util'),
    View = require('./view'),
    Label = require('./label');

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

var element = function () {
    
    var el = document.createElement('ui-tabbarbutton');
    el.style.pointerEvents = 'fill';
    el.style.flex = '1';
    return el;
};

function TabBarButton() {
    var self = this;
    View.apply(this, arguments);
    this.element = element();

    //SETUP INHERITED PROPERTIES
    this.height = '48px';
    this.width = '100px';
    
    this.titleLabel = new Label();
    this.titleLabel.textElement.style.font = 'font-family: "icons"';
    this.titleLabel.textAlign = 'center';
    this.titleLabel.fontSize = '13px';
    this.titleLabel.textVerticalAlign = 'center';
    this.appendChild(this.titleLabel);
    
    //CUSTOM MOUSE EVENTS
    this.element.onmouseover = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    this.element.onmouseout = function () {
        var _backgroundColor = self.backgroundColor,
            _iconColor = self.iconColor;
        self.backgroundColor = _iconColor;
        self.iconColor = _backgroundColor;
    };
    this.element.onclick = function () {
        if (self.tabBarViewController && self.tabBarViewController.didPressTabBarButton) {
            self.tabBarViewController.didPressTabBarButton(self); 
        }
    };
    
    //CUSTOM PROPERTIES
    var text,
        textColor,
        selected;
            
    Object.defineProperty(this, 'text', {
        get: function() {
          return text;
        },
        set: function(newValue) {
           text = newValue;
           this.titleLabel.text = newValue;
        }
    });
    
    Object.defineProperty(this, 'textColor', {
        get: function() {
          return textColor;
        },
        set: function(newValue) {
           textColor = newValue;
           this.titleLabel.textColor = newValue;
        }
    });
    
    Object.defineProperty(this, 'selected', {
        get: function() {
          return selected;
        },
        set: function(newValue) {
           selected = newValue;
           if (selected) {
               if (!textColor) {
                   textColor = this.titleLabel.element.style.color;
               }
               this.titleLabel.textColor = textColor;
                
            } else {
               this.titleLabel.textColor = blendColors(textColor, '#000000', 0.4);
            }
        }
    });
}

util.inherits(TabBarButton, View);

module.exports = TabBarButton;
},{"./label":15,"./view":22,"util":29}],21:[function(require,module,exports){
var util = require('util'),
    View = require('./view');

//Private Methods
var element = function () {
    var el = document.createElement('ui-tabview');
    return el;
};

//Public Methods
function TabView() {
    View.apply(this, arguments);
    this.element = element();
    this.name = 'tabView';
    
}

util.inherits(TabView, View);

module.exports = TabView;
},{"./view":22,"util":29}],22:[function(require,module,exports){
//Private Methods
var element = function () {
    
    var el = document.createElement('ui-view');
    return el;
};

//Public Methods
function View() {
    this.element = element();
    this.element.parentView = this;
    
    this.name = 'view';
    
    var width,
        height,
        backgroundColor,
        borderColor;
    
    Object.defineProperty(this, 'width', {
        get: function() {
            return width;
        },
        set: function(newValue) {
            width = newValue;
            if (this.element) {
                this.element.style.minWidth = newValue;
                this.element.style.maxWidth = newValue;
                this.element.style.width = newValue;
            }
        }
    });
    
    Object.defineProperty(this, 'height', {
        get: function() {
            return height;
        },
        set: function(newValue) {
            height = newValue;
            if (this.element) {
                this.element.style.height = newValue;
            }
        }
    });
    
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return backgroundColor;
        },
        set: function(newValue) {
            backgroundColor = newValue;
            if (this.element) {
                this.element.style.backgroundColor = newValue;
            }
        }
    });
    
    Object.defineProperty(this, 'borderColor', {
        get: function() {
            return borderColor;
        },
        set: function(newValue) {
            borderColor = newValue;
            if (this.element) {
                this.element.style.outlineStyle = 'solid';
                this.element.style.outlineColor = newValue;
            }
        }
    });
}

View.prototype.unload = function () {

    this.element.parentElement.removeChild(this.element);
    this.element.parentView = null;
    this.element = null;
    
    for (var prop in this) {
        this[prop] = null;
    }
};

View.prototype.empty = function () {
    
    this.element.textContent = '';
};

View.prototype.appendChild = function (child) {
    
    this.element.appendChild(child.element);
    
};

View.prototype.replaceChild = function (replacement, child) {
    
    this.element.replaceChild(replacement.element, child.element);
    
};

module.exports = View;
},{}],23:[function(require,module,exports){
var attachFastClick = require('fastclick');
attachFastClick(document.body);

//Used in to polyfil registerElement
require('document-register-element');

var App = require('./app/app.js'),
    app = new App();

app.appWillFinishLaunching();
},{"./app/app.js":1,"document-register-element":24,"fastclick":25}],24:[function(require,module,exports){
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function q(e,t){for(var n=0,r=e.length;n<r;n++)J(e[n],t)}function R(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],$(r,c[z(r)])}function U(e){return function(t){g.call(L,t)&&(J(t,e),q(t.querySelectorAll(h),e))}}function z(e){var t=e.getAttribute("is");return d.call(l,t?t.toUpperCase():e.nodeName)}function W(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;t.attributeChangedCallback&&t.attributeChangedCallback(e.attrName,n===e.ADDITION?null:r,n===e.REMOVAL?null:i)}function X(e){var t=U(e);return function(e){t(e.target)}}function V(e,t){var n=this;O.call(n,e,t),B.call(n,{target:n})}function $(e,t){N(e,t),I?I.observe(e,_):(H&&(e.setAttribute=V,e[i]=F(e),e.addEventListener(u,B)),e.addEventListener(o,W)),e.createdCallback&&(e.created=!0,e.createdCallback(),e.created=!1)}function J(e,t){var n,r=z(e),i="attached",s="detached";-1<r&&(C(e,c[r]),r=0,t===i&&!e[i]?(e[s]=!1,e[i]=!0,r=1):t===s&&!e[s]&&(e[i]=!1,e[s]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="extends",o="DOMAttrModified",u="DOMSubtreeModified",a=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,f=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],l=[],c=[],h="",p=t.documentElement,d=l.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},v=n.prototype,m=v.hasOwnProperty,g=v.isPrototypeOf,y=n.defineProperty,b=n.getOwnPropertyDescriptor,w=n.getOwnPropertyNames,E=n.getPrototypeOf,S=n.setPrototypeOf,x=!!n.__proto__,T=n.create||function K(e){return e?(K.prototype=e,new K):this},N=S||(x?function(e,t){return e.__proto__=t,e}:b?function(){function e(e,t){for(var n,r=w(t),i=0,s=r.length;i<s;i++)n=r[i],m.call(e,n)||y(e,n,b(t,n))}return function(t,n){do e(t,n);while(n=E(n));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),C=S||x?function(e,t){g.call(t,e)||$(e,t)}:function(e,t){e[i]||(e[i]=n(!0),$(e,t))},k=e.MutationObserver||e.WebKitMutationObserver,L=(e.HTMLElement||e.Element||e.Node).prototype,A=L.cloneNode,O=L.setAttribute,M=t.createElement,_=k&&{attributes:!0,characterData:!0,attributeOldValue:!0},D=k||function(e){H=!1,p.removeEventListener(o,D)},P=!1,H=!0,B,j,F,I;k||(p.addEventListener(o,D),p.setAttribute(i,1),p.removeAttribute(i),H&&(B=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=F(t);for(s in r){if(!(s in n))return j(0,t,s,n[s],r[s],"ADDITION");if(r[s]!==n[s])return j(1,t,s,n[s],r[s],"MODIFICATION")}for(s in n)if(!(s in r))return j(2,t,s,n[s],r[s],"REMOVAL")}},j=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,W(o)},F=function(e){for(var t,n={},r=e.attributes,i=0,s=r.length;i<s;i++)t=r[i],n[t.name]=t.value;return n})),t[r]=function(n,r){y=n.toUpperCase(),P||(P=!0,k?(I=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new k(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,s.attributeChangedCallback&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(U("attached"),U("detached")),I.observe(t,{childList:!0,subtree:!0})):(t.addEventListener("DOMNodeInserted",X("attached")),t.addEventListener("DOMNodeRemoved",X("detached"))),t.createElement=function(e,n){var r,i=M.apply(t,arguments);return n&&i.setAttribute("is",e=n.toLowerCase()),r=d.call(l,e.toUpperCase()),-1<r&&$(i,c[r]),i},L.cloneNode=function(e){var t=A.call(this,!!e),n=z(t);return-1<n&&$(t,c[n]),e&&R(t.querySelectorAll(h)),t});if(-1<d.call(l,y))throw new Error("A "+n+" type is already registered");if(!a.test(y)||-1<d.call(f,y))throw new Error("The type "+n+" is invalid");var i=function(){return t.createElement(p,u&&y)},o=r||v,u=m.call(o,s),p=u?r[s]:y,g=l.push(y)-1,y;return h=h.concat(h.length?",":"",u?p+'[is="'+n.toLowerCase()+'"]':p),i.prototype=c[g]=m.call(o,"prototype")?o.prototype:T(L),q(t.querySelectorAll(h),"attached"),i}})(window,document,Object,"registerElement");
},{}],25:[function(require,module,exports){
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.3
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specified layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
function FastClick(layer, options) {
	'use strict';
	var oldOnClick;

	options = options || {};

	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = options.touchBoundary || 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	/**
	 * The minimum time between tap(touchstart and touchend) events
	 *
	 * @type number
	 */
	this.tapDelay = options.tapDelay || 200;

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}


	var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) {
		context[methods[i]] = bind(context[methods[i]], context);
	}

	// Set up event handlers as required
	if (deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

/**
 * BlackBerry requires exceptions.
 *
 * @type boolean
 */
var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
			// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
			// random integers, it's safe to to continue if the identifier is 0 here.
			if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);
		this.sendClick(targetElement, event);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
		if (!deviceIsIOS || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (deviceIsIOS && !deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;
	var blackberryVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	if (deviceIsBlackBerry10) {
		blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

		// BlackBerry 10.3+ does not require Fastclick library.
		// https://github.com/ftlabs/fastclick/issues/251
		if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// user-scalable=no eliminates click delay.
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// width=device-width (or less than device-width) eliminates click delay.
				if (document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
FastClick.attach = function(layer, options) {
	'use strict';
	return new FastClick(layer, options);
};


if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

},{}],26:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],28:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],29:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":28,"_process":27,"inherits":26}],30:[function(require,module,exports){
var App = function () {
    window.iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
};

App.prototype.appWillFinishLaunching = function () {
    this.appDidFinishLauncing();
};

App.prototype.setRootViewController = function (rootViewController) {
    window.document.body.appendChild(rootViewController.view.element);
};

module.exports = App;
},{}],31:[function(require,module,exports){
var View = require('./uikit/views/view'),
    ScrollView = require('./uikit/views/scrollView'),
    BarButton = require('./uikit/views/barButton'),
    Label = require('./uikit/views/label'),
    NavigationBar = require('./uikit/views/navigationBar'),
    CollectionCell = require('./uikit/views/collectionCell'),
    Button = require('./uikit/views/button');

    document.registerElement('ui-view');
    document.registerElement('ui-scrollview');
    document.registerElement('ui-barbutton');
    document.registerElement('ui-button');
    document.registerElement('ui-collectioncell');
    document.registerElement('ui-label');
    document.registerElement('ui-navigationbar');
    document.registerElement('ui-navigationview');

var ViewController = require('./uikit/viewControllers/viewController'),
    ScrollViewController = require('./uikit/viewControllers/scrollViewController'),
    SplitViewController = require('./uikit/viewControllers/splitViewController'),
    CollectionViewController = require('./uikit/viewControllers/collectionViewController'),
    NavigationViewController = require('./uikit/viewControllers/navigationViewController'),
    ModalViewController = require('./uikit/viewControllers/modalViewController'),
    TabBarViewController = require('./uikit/viewControllers/tabBarViewController'),
    PopOverViewController = require('./uikit/viewControllers/popOverViewController');

module.exports = {
	name: 'uikit',
    inherits: require('util').inherits,
    
    View: View,
    ScrollView: ScrollView,
    BarButton: BarButton,
    Label: Label,
    NavigationBar: NavigationBar,
    CollectionCell: CollectionCell,
    Button: Button,
    
    ViewController: ViewController,
    ScrollViewController: ScrollViewController,
    SplitViewController: SplitViewController,
    CollectionViewController: CollectionViewController,
    NavigationViewController: NavigationViewController,
    ModalViewController: ModalViewController,
    TabBarViewController: TabBarViewController,
    PopOverViewController: PopOverViewController
};
},{"./uikit/viewControllers/collectionViewController":4,"./uikit/viewControllers/modalViewController":5,"./uikit/viewControllers/navigationViewController":6,"./uikit/viewControllers/popOverViewController":7,"./uikit/viewControllers/scrollViewController":8,"./uikit/viewControllers/splitViewController":9,"./uikit/viewControllers/tabBarViewController":10,"./uikit/viewControllers/viewController":11,"./uikit/views/barButton":12,"./uikit/views/button":13,"./uikit/views/collectionCell":14,"./uikit/views/label":15,"./uikit/views/navigationBar":16,"./uikit/views/scrollView":18,"./uikit/views/view":22,"util":29}],32:[function(require,module,exports){
module.exports=require(22)
},{}]},{},[23]);
