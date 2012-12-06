
GYP = node-gyp

default: all

clean:
	$(GYP) clean
	rm -Rf lib

configure:
	$(GYP) configure

all: clean configure
	$(GYP) build --verbose
	mkdir -p lib
	cp ./build/Release/wordsplit.node lib/

test: all
	node test/test.js

leaktest: all
	valgrind node test/leaktest.js

.PHONY: all test clean default leaktest

