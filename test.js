
// test.js - General test script
(function() {

  var util = require('util')
    , log = require('winston')
    , ws = require('./node-icu-wordsplit')
    , log = console.log;

  // some test strings
  var strings =
    [ "The quick brown fox jumps over the lazy dog."
    , "เดอะควิกบราวน์ฟอกซ์จัมป์โอเวอร์เดอะเลซี่ด็อก" ];

  // prerequisite tests
  log(util.inspect(ws));

})();
