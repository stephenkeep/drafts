'use strict';
var element = require('scribe-common/src/element');
var contains = require('lodash').contains;

  // http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
  var html5VoidElements = ['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'];

  function traverse(parentNode) {
    // Instead of TreeWalker, which gets confused when the BR is added to the dom,
    // we recursively traverse the tree to look for an empty node that can have childNodes

    var node = parentNode.firstElementChild;

    function isEmpty(node) {
      return node.children.length === 0
        || (node.children.length === 1
            && element.isSelectionMarkerNode(node.children[0]));
    }

    while (node) {
      if (!element.isSelectionMarkerNode(node)) {
        // Find any node that contains no child *elements*, or just contains
        // whitespace, and is not self-closing
        if (isEmpty(node) &&
          node.textContent.trim() === '' &&
          !contains(html5VoidElements, node.nodeName))
        {
          node.appendChild(document.createElement('br'));
        } else if (node.children.length > 0) {
          traverse(node);
        }
      }
      node = node.nextElementSibling;
    }
  }

  module.exports = function () {
    return function (scribe) {

      scribe.registerHTMLFormatter('normalize', function (html) {
        var bin = document.createElement('div');
        bin.innerHTML = html;

        traverse(bin);

        return bin.innerHTML;
      });

    };
  };


