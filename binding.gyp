{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["src/wordsplit.cc"],
      "libraries": ["<!@(icu-config --ldflags)"],
      'include_dirs': [
        '<!(node -e "require(\'nan\')")'
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          "<!(icu-config --cppflags)",
        ],
      },
    }
  ]
}
