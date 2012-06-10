
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
    , text('en_US', 'This is just a quick quick test sentence.')
    , text('ja_JP', 'わたしはじぶんのなまえにわすれてしまった')
    , text('th_TH', 'สมเด็จพระนเรศวรมหาราชทรงครองราชยาวนานถึงห้าพันปี')
    , text('th_TH', 'เดอะควิกบราวน์ฟอกซ์จัมป์โอเวอร์เดอะเลซี่ด็อก')
    , text('th_TH', 'ยูนิโค้ดในภาษาซีนี่มันนรกชัดๆ ปวดหัวจริงๆ') ];

  // delayed function call (for exception testing.)
  var ws_ = function() {
    var args = arguments;
    return function() { ws.apply(null, args); };
  };

  // test preconditions
  expect(ws).to.be.a('function');
  expect(ws_()).to.throws(/locale/);
  expect(ws_('th_TH')).to.throws(/text/).and.not.to.throws(/locale/);
  expect(ws_('th_TH', 'text')).to.not.throws();

  // test results
  var results = _.map(texts, function(value) {
    var result = ws(value.locale, value.text);

    console.log(value.locale + ' ' + value.text);
    console.log(result);
    return result;
  });

  expect(results[0]).to.exist;
  expect(results[0]).to.have.length(9);
  expect(results[0][0]).to.equal('The');
  expect(results[0][7]).to.equal('lazy');
  expect(results[0][8]).to.equal('dog');

  // TODO: More tests

  console.log("All green.");

})();
