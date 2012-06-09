
#include <stdio.h>
// node includes
#include <v8.h>
#include <node.h>

// ICU includes
#include <unicode/brkiter.h>


#define WS_THROW(msg) return v8::ThrowException(v8::Exception::Error(v8::String::New(msg)))


// function template
static v8::Persistent<v8::FunctionTemplate> ft_splitWords;
static bool ft_splitWords_once = false;


// v8 shim
// NOTE: arguments precondition checked in js wrapper file
static v8::Handle<v8::Value>
SplitWords(const v8::Arguments &args) {
  v8::HandleScope scope;

  // convert arguments to c-string
  v8::Local<v8::String> localeStr(args[0]->ToString());
  v8::Local<v8::String> textStr(args[1]->ToString());

  const char *localeArg = *v8::String::Utf8Value(localeStr);
  const char *textArg = *v8::String::Utf8Value(textStr);

  // prepare iterator
  Locale locale(localeArg);


  // finish
  return scope.Close(localeStr);
}


// module setup
static void
Init(v8::Handle<v8::Object> exports) {
  if (!ft_splitWords_once) {
    ft_splitWords = v8::Persistent<v8::FunctionTemplate>::New(v8::FunctionTemplate::New(SplitWords));
    ft_splitWords_once = true;
  }

  exports->Set(v8::String::NewSymbol("splitWords"), ft_splitWords->GetFunction());
}

NODE_MODULE(wordsplit, Init);

