var UI = require(__base + 'core/frameworks/uikit'),
    Scribe = require('scribe-editor'),
    scribePluginToolbar = require('scribe-plugin-toolbar');

function ComposeViewController() {
    UI.ViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
    
    this.toolbar = new UI.View();
    this.toolbar.height = '48px';
    this.toolbar.element.innerHTML = '<button data-command-name="bold">Bold</button> \
                                      <button data-command-name="italic">Italic</button> \
                                      <button data-command-name="underline">Underline</button>';
    this.view.appendChild(this.toolbar);
    
    this.editor = new UI.View();
    this.view.appendChild(this.editor);

    var scribe = new Scribe(this.editor.element);

    scribe.setContent('<p>Hello, World!</p>');
    
    scribe.use(scribePluginToolbar(this.toolbar.element));
    
    function updateHtml() {
      console.log(scribe.getHTML());
    }

    scribe.on('content-changed', updateHtml);
    
}

UI.inherits(ComposeViewController, UI.ViewController);

module.exports = ComposeViewController;