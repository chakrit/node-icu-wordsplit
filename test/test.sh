#!/bin/sh

cd .. && ./build.sh -v && cd test
node test.js

