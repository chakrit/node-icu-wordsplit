#!/bin/sh

cd .. && ./build.sh && cd test
valgrind --trace-children=yes --leak-check=full node test.js

