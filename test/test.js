
// test.js - General test script
(function() {

  var _ = require('underscore')
    , util = require('util')
    , fs = require('fs')
    , expect = require('chai').expect
    , ws = require('../index')
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
    , text('th_TH', 'ยูนิโค้ดในภาษาซีนี่มันนรกชัดๆ ปวดหัวจริงๆ')
    , text('th_TH', fs.readFileSync(__dirname + '/test_th_long.txt').toString()) ];

  // delayed function call (for exception testing.)
  var ws_ = function() {
    var args = arguments;
    return function() { ws.apply(null, args); };
  };

  // test preconditions
  expect(ws).to.be.a('function');
  expect(ws_()).to.throws(/text/);
  expect(ws_('text')).to.not.throws()
  expect(ws_('th_TH', 'text')).to.not.throws();

  // test results
  var results = _.map(texts, function(value) {
    var result = ws(value.locale, value.text)
      , msg = '';

    for (var i = 0; i < result.length; i++)
      msg += result + ' ';

    console.log('===');
    console.log(value.locale);
    console.log('---');
    console.log(value.text);
    console.log('---');
    console.log(msg);
    console.log('===');
    return result;
  });

  expect(results[0]).to.exist;
  expect(results[0]).to.have.length(9);
  expect(results[0][0]).to.equal('The');
  expect(results[0][7]).to.equal('lazy');
  expect(results[0][8]).to.equal('dog');

  // TODO: More tests

  console.log("");
  console.log("Please manually check the above results.");
  console.log("Otherwise, this looks all green to me.");

})();

