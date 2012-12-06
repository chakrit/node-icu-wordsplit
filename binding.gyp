{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["src/wordsplit.cc"],
      "libraries": ["$(icu-config --ldflags)"],
      "cflags_cc": ["-fno-exceptions", "$(icu-config --cppflags)"]
    }
  ]
}
