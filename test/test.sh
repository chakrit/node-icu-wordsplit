#!/bin/sh

cd ..
node-gyp clean -v && \
  node-gyp configure -v && \
  node-gyp build -v && \
  node test.js

