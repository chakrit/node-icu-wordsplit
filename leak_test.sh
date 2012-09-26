#!/bin/sh

node-gyp clean && \
  node-gyp configure && \
  node-gyp build && \
  valgrind --trace-children=yes --leak-check=full node test.js

