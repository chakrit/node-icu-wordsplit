#!/usr/bin/env python

def set_options(ctx):
  ctx.tool_options('compiler_cxx')

def configure(ctx):
  ctx.check_tool('compiler_cxx')
  ctx.check_tool('node_addon')

def build(ctx):
  t = ctx.new_task_gen('cxx', 'shlib', 'node_addon')

  ctx.env['LDFLAGS'] += ['-L/usr/local/Cellar/icu4c/4.8.1.1/lib']
  ctx.env['CPPFLAGS'] += ['-I/usr/local/Cellar/icu4c/4.8.1.1/include']

  t.source = ['wordsplit.cpp']
  t.target = 'wordsplit'

