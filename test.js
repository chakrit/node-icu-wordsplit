
// test.js - General test script
(function() {

  var _ = require('underscore')
    , util = require('util')
    , expect = require('chai').expect
    , ws = require('./node-icu-wordsplit')
    , log = console.log;

  // some test strings
  var text = function(locale, text) {
    return { locale: locale, text: text };
  };

  var texts =
    [ text('en_US', 'The quick brown fox jumps over the lazy dog.')
    , text('th_TH', 'เดอะควิกบราวน์ฟอกซ์จัมป์โอเวอร์เดอะเลซี่ด็อก')
    , text('th_TH', 'สมเด็จพระนเรศวรมหาราชทรงครองราชยาวนานถึงห้าพันปี') ];

  // delayed function call (for exception testing.)
  var ws_ = function() {
    var args = arguments;
    return function() { ws.apply(null, args); };
  };

  // test preconditions
  /*expect(ws).to.be.a('function');
  expect(ws_()).to.throws(/locale/);
  expect(ws_('th_TH')).to.throws(/text/).and.not.to.throws(/locale/);
  expect(ws_('th_TH', 'text')).to.not.throws();*/

  // test results
  var results = _.map(texts, function(value) {
    return ws(value.locale, value.text);
  });

  expect(results[0]).to.exist;
  expect(results[0]).to.have.length(9);
  expect(results[0][0]).to.equal('The');
  expect(results[0][7]).to.equal('lazy');
  expect(results[0][8]).to.equal('dog');

  /* expect(results[1]).to.exist;
  expect(results[2]).to.exist;*/

  // test inner workings
  // kk

  console.log("All green.");

})();
