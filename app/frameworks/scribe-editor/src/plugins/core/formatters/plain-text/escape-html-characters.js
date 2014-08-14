'use strict';
var escape = require('lodash').escape;

  module.exports = function () {
    return function (scribe) {
      scribe.registerPlainTextFormatter(escape);
    };
  };


