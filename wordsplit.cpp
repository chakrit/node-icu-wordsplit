#include <v8.h>
#include <node.h>

using namespace v8;
using namespace node;

static void Init(Handle<Object> exports) {
  exports->Set(String::New("Hello"), String::New("World"));
}

// mandatory node register calls
NODE_MODULE(wordsplit, Init);

