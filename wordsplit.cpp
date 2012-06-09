#include <v8.h>
#include <node.h>

using namespace v8;
using namespace node;

static void Init(Handle<Object> exports) {
}

// mandatory node register calls
NODE_MODULE(wordsplit, Init);

