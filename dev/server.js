/*jshint node: true */

var express = require('express'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    app = express(),
    path = require('path');

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/../index.html', function (err, data) {
        if (err) {
            throw err;
        }
        /*jshint -W020 */
        $ = cheerio.load(data);
        $('head').prepend('<script>window.debug = true</script>');
        res.send($.html());
    });
});
 

app.get(/^(.+)$/, function (req, res) {
    res.sendfile(path.resolve('..' + req.params[0]));
});


app.listen(3040);
console.log('Listening on port 3040');