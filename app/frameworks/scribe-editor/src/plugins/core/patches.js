'use strict';
var boldCommand = require('./patches/commands/bold');
var indentCommand = require('./patches/commands/indent');
var insertHTMLCommand = require('./patches/commands/insert-html');
var insertListCommands = require('./patches/commands/insert-list');
var outdentCommand = require('./patches/commands/outdent');
var createLinkCommand = require('./patches/commands/create-link');
var events = require('./patches/events');

  module.exports = {
    commands: {
      bold: boldCommand,
      indent: indentCommand,
      insertHTML: insertHTMLCommand,
      insertList: insertListCommands,
      outdent: outdentCommand,
      createLink: createLinkCommand,
    },
    events: events
  };


