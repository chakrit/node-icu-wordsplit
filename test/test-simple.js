
// test-simple.js - Simple tests for tracing leaks
(function() {

  var ws = require('../node-icu-wordsplit')
    , log = console.log;

  var locale = 'ja_JP'
    , text = 'わたしはじぶんのなまえにわすれてしまった'
    , results = ws(locale, text);

  for (var i = 0; i < results.length; i++) {
    cosnole.log(results[i]);
  }

})();
