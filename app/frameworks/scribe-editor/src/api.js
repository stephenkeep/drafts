'use strict';
var buildCommandPatch = require('./api/command-patch');
var buildCommand = require('./api/command');
var Node = require('./api/node');
var buildSelection = require('./api/selection');
var buildSimpleCommand = require('./api/simple-command');

  module.exports = function Api(scribe) {
    this.CommandPatch = buildCommandPatch(scribe);
    this.Command = buildCommand(scribe);
    this.Node = Node;
    this.Selection = buildSelection(scribe);
    this.SimpleCommand = buildSimpleCommand(this, scribe);
  };

