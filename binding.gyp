{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["src/wordsplit.cc"],
      "libraries": ["<!@(icu-config --ldflags)"],
      "cflags": ["<!@(icu-config --cppflags)"],
      "conditions": [
        ['OS=="mac"', {
          "OTHER_CFLAGS": ["<!@(icu-config --cppflags)"]
        }]
      ]
    }
  ]
}
