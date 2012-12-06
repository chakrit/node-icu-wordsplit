
GYP=./node_modules/.bin/node-gyp

default: all

clean:
	$(GYP) clean

configure:
	$(GYP) configure

all: clean configure
	$(GYP) build

test:
	node test/test.js

leaktest: all
	valgrind node test/leaktest.js

.PHONY: all test clean default leaktest

