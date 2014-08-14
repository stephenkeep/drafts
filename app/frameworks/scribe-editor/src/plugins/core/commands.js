'use strict';
var indent = require('./commands/indent');
var insertList = require('./commands/insert-list');
var outdent = require('./commands/outdent');
var redo = require('./commands/redo');
var subscript = require('./commands/subscript');
var superscript = require('./commands/superscript');
var undo = require('./commands/undo');

  module.exports = {
    indent: indent,
    insertList: insertList,
    outdent: outdent,
    redo: redo,
    subscript: subscript,
    superscript: superscript,
    undo: undo
  };


