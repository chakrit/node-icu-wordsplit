
// node includes
#include <v8.h>
#include <node.h>

// ICU includes
#include <unicode/utypes.h>

static void Init(v8::Handle<v8::Object> exports) {
  exports->Set(v8::String::New("Hello"), v8::String::New("World"));
}

// mandatory node register calls
NODE_MODULE(wordsplit, Init);

