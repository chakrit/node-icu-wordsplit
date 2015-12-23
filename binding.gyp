{
  "targets": [
    {
      "target_name": "wordsplit",
      "sources": ["src/wordsplit.cc"],
      "libraries": ["<!@(icu-config --ldflags)"],
      'include_dirs': [
        '<!@(icu-config --cppflags-searchpath)',
        '<!(node -e "require(\'nan\')")'
      ],
    }
  ]
}
