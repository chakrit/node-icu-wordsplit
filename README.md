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

    npm install node-icu-wordsplit

And you should now be able to `require('node-icu-wordsplit')` in your code.

## API

TODO:

