{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["wordsplit.cc"],
      "libraries": ["`icu-config --ldflags`"],
      "cflags!": ["-fno-exceptions", "`icu-config --cppflags`"],
      "libraries": ["libpthread.dylib", "libm.dylib", "libicui18n.dylib", "libicuuc.dylib", "libicudata.dylib"]
    }
  ]
}
