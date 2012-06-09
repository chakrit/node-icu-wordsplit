
// test.js - General test script
(function() {

  var util = require('util')
    , ws = require('./build/Release/wordsplit');

  console.log(util.inspect(ws));

})();
