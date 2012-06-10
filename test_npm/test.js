
// test.js - Test icu-wordsplit downloaded via npm.
(function() {

  var ws = require('icu-wordsplit')
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

  for (var i = 0; i < texts.length; i++) (function(locale, sentence) {

    log('');
    log(' ---- ');
    log('LOCALE: ' + locale);
    log('TEXT:   ' + sentence);
    log('');
    log(ws(locale, sentence));
    log(' ---- ');
    log('');


  })(texts[i].locale, texts[i].text);

})();
