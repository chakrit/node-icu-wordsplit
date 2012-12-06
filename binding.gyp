{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["src/wordsplit.cc"],
      "cflags!": ["-fno-exceptions", "`icu-config --cflags`"],
      "cflags_cc!": ["-fno-exceptions", "`icu-config --cppflags`"],
      "libraries": ["`icu-config --ldflags`"]
    }
  ]
}
