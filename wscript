#!/usr/bin/env python
# REF: https://github.com/astro/node-stringprep/blob/13b69b31d5ab90e3d6bde7461890fc1f64fb01d0/wscript
import os

def backtick(cmd):
  return os.popen(cmd).read().strip()

def set_options(ctx):
  ctx.tool_options('compiler_cxx')

def configure(ctx):
  ctx.check_tool('compiler_cxx')
  ctx.check_tool('node_addon')

  if backtick('icu-config --version')[0] != '4':
    ctx.fatal('Missing library icu 4.x.x')

  ctx.env['CXXFLAGS_ICU'] = backtick('icu-config --cppflags').replace('-pedantic', '').split(' ')
  ctx.env['LINKFLAGS_ICU'] = backtick('icu-config --ldflags').split(' ')
  ctx.env.set_variant("default")

def build(ctx):
  t = ctx.new_task_gen('cxx', 'shlib', 'node_addon')
  t.uselib = 'ICU'
  t.source = ['wordsplit.cpp']
  t.target = 'wordsplit'

