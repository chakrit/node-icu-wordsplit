
// node-icu-wordsplit.js - Main JS entrypoint for the module
//   Needed this because somehow the node native module build system
//   doesn't like dashes in the module name.
(function() {

  var core = require('./build/Release/wordsplit.node');

  // TODO: Object bindings?

  module.exports = core;

})();
