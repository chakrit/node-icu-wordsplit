#!/bin/sh

node-gyp clean $1 $2 && \
  node-gyp configure $1 $2 && \
  node-gyp build $1 $2

