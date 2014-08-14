var UI = require(__base + 'core/frameworks/uikit'),
    Scribe = require('scribe-editor'),
    scribePluginToolbar = require('scribe-plugin-toolbar'),
    ToolbarViewController = require(__base + 'app/viewControllers/posts/toolBarViewController'),
    ThemeService = require(__base + 'app/services/themeService');

function ComposeViewController() {
    UI.ScrollViewController.apply(this, arguments);
    
    this.view.backgroundColor = '#F8F8F8';
}

UI.inherits(ComposeViewController, UI.ScrollViewController);

ComposeViewController.prototype.viewDidLoad = function () {
    var self = this;

    this.toolbarViewController = new ToolbarViewController();
    this.popOverViewController = new UI.PopOverViewController();
    this.popOverViewController.setRootViewController(this.toolbarViewController);
    this.popOverViewController.hide();
    this.parentViewController.view.appendChild(this.popOverViewController.view);
    
    var themes = new ThemeService();
    var scribe = null;
    
    this.editor = new UI.View();
    this.editor.height = 'initial';
    this.view.appendChild(this.editor);
    this.shadow = this.editor.element.createShadowRoot();
    
    window.shadow = this.shadow;
    
    function updateHtml() {
      console.log(scribe.getHTML());
    }
    
    themes.getPost(function (html) {
        
        self.shadow.innerHTML = html;
        var content = self.shadow.getElementById('post');
        
        scribe = new Scribe(content);
        
        var post = '<h1>Make All the Difference</h1><h2>Font Characteristics and The Importance of Great Font</h2><p>In traditional typography, a font is a particular size, weight and style of a typeface. Each font was a matched set of metal type, one piece (called a “sort”) for each glyph, and a typeface comprised a range of fonts that shared an overall design.</p><p>In modern usage, with the advent of digital typography, font is frequently synonymous with typeface. In particular, the use of “vector” or “outline” fonts means that different sizes of a typeface can be dynamically generated from one design.</p><h3>Font Characteristics</h3><p>In addition to the character height, when using the mechanical sense of the term, there are several characteristics which may distinguish fonts, though they would also depend on the script(s) that the typeface supports. In European alphabetic scripts, i.e. Latin, Cyrillic and Greek, the main such properties are the stroke width, called weight, the style or angle and the character width.</p><blockquote><p>Different fonts of the same typeface may be used in the same work for various degrees of readability and emphasis.</p></blockquote><p>The regular or standard font is sometimes labeled roman, both to distinguish it from bold or thin and from italic or oblique. The keyword for the default, regular case is often omitted for variants and never repeated, otherwise it would be Bulmer regular italic, Bulmer bold regular and even Bulmer regular regular. Roman can also refer to the language coverage of a font, acting as a shorthand for “Western European.”</p>';
    
        
        scribe.setContent(post);
        scribe.use(scribePluginToolbar(self.toolbarViewController.view.element));
        scribe.on('content-changed', updateHtml);
        
        content.onselectstart = function() {
            console.log('onselectstart');
            content.onmouseup = function () { 
                console.log('onmouseup');
                var selection = new scribe.api.Selection(); 
                console.log(selection);
                if (selection.range && selection.range.startOffset !== selection.range.endOffset) {
                    
                    console.log('BOOM');
                    
                    var rect = selection.range.getBoundingClientRect();
                    var x = (rect.left) + (rect.width / 2);
                    var y = rect.top;
                    self.popOverViewController.setXYPosition(x, y);
                    self.popOverViewController.show();
                }
            };
        };
        
        content.onmousedown = function () { 
            self.popOverViewController.hide();
        };
           
    });
        
   
};

module.exports = ComposeViewController;