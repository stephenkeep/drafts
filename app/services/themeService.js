var fs = require('fs');


var theme = 'base',
    root = __base + 'app/themes/' + theme + '/';

function ThemeService() {
    
}

ThemeService.prototype.getPost = function (callback) {
    fs.readFile(root + 'post.html', 'utf8', function (err, postHtml) {
        if (err) {
            throw err;
        }
        
        fs.readFile(root + 'styles/base.css', 'utf8', function (err, css) {
            if (err) {
                throw err;
            }
            
            var style = '<style>' + css + '</style>';
            callback(style + postHtml);
        });

    });
};

module.exports = ThemeService;