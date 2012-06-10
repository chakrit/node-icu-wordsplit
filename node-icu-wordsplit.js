
// node-icu-wordsplit.js - Main JS entrypoint for the module
//   Needed this because somehow the node native module build system
//   doesn't like dashes in the module name and I don't know how
//   to export a function object directly from a native module.
(function() {

  var splitWords = require('./build/default/wordsplit.node').splitWords;

  // adds precondition checks (easier to do via JS)
  module.exports = (function(split) {
    return function(locale, text) {

      if (!locale) throw Error('locale argument is required.');
      if (!text) throw Error('text argument is required.');

      // make sure we have a string
      locale = "" + locale;
      text = "" + text;

      // should be safe to venture into C land by now
      return split(locale, text);

    };
  })(splitWords);

})();
