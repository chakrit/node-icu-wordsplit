
// leaktest.js - Simple looped invocation for testing leaks.
(function() {

  var ws = require('../index')
    , log = console.log;

  var locale = 'ja_JP'
    , text = 'わたしはじぶんのなまえにわすれてしまった'
    , results = ws(locale, text);

  for (var i = 0; i < results.length; i++) {
    console.log(results[i]);
  }

})();
