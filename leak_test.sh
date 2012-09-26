#!/bin/sh

node-gyp clean && \
  node-gyp configure && \
  node-gyp build && \
  valgrind --trace-children=yes -v node test.js

