#!/bin/sh

cd .. && ./build.sh && cd test
valgrind $1 $2 $3 node test-simple.js

