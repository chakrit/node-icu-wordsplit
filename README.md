# node-icu-wordsplit

First, install libicu from source (so you have all the needed headers and binaries)

    wget http://download.icu-project.org/files/icu4c/49.1.2/icu4c-49_1_2-src.tgz
    tar -xvzf icu4c-49_1_2-src.tgz

    cd icu/source
    ./configure
    make
    make install

This will take a while. After it finishes you should have all the required ICU
headers and binaries in your default build path.

Afterwards, switch to your project folder and

    npm install icu-wordsplit

And you should now be able to `require('icu-wordsplit')` in your code.

## API

Right now the only function call available is exported from the module.

**NOTE:** The function requires *exactly* TWO arguments.

    var splitWord = require('icu-wordsplit');

    var results = splitWord('en_US', 'The quick brown fox jumps over the lazy dog.');
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
    }

The first argument is the locale. You *must* specify an ICU-compatible locale name here.
The second argument is the string to which to split.

The function will returns an array of words. Whitespaces and some common punctuations
may be automatically removed from the list.

## TODO / CONTRIBUTE

All contributions welcome!

Here's something to do:

* More tests with more languages.
* Add more ICU functionality (like locale auto-detection.)
* Multiple locale support? (remove the need for locale parameter.)

