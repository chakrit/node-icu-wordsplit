{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["wordsplit.cc"],
      "libraries": ["`icu-config --ldflags`"],
      "cflags!": ["-fno-exceptions", "`icu-config --cppflags`"],
      "cflags_cc!": ["-fno-exceptions"]
    }
  ]
}
