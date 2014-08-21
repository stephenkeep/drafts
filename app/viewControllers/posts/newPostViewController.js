var UI = require(__base + 'core/frameworks/uikit');

function NewPostViewController() {
    UI.ViewController.apply(this, arguments);
   
    this.view.parentViewController = this;
    this.view.backgroundColor = 'red';
    this.view.height = '288px';
    this.view.width = '288px';

}

UI.inherits(NewPostViewController, UI.ViewController);

NewPostViewController.prototype.viewWillAppear = function () {
    console.log('viewWillAppear');
};

NewPostViewController.prototype.viewDidAppear = function () {
    console.log('viewDidAppear');
};

module.exports = NewPostViewController;