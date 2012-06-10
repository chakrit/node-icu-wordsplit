
// node includes
#include <v8.h>
#include <node.h>

// ICU includes
#include <unicode/brkiter.h>
#include <unicode/errorcode.h>
#include <unicode/unistr.h>


#define WS_THROW(msg) v8::ThrowException(v8::Exception::Error(v8::String::New(msg)))


// function template
static v8::Persistent<v8::FunctionTemplate> ft_splitWords;
static bool ft_splitWords_once = false;


static v8::Handle<v8::Value>
Throw(const char *message) {
  return v8::ThrowException(v8::Exception::Error(v8::String::New(message)));
}


// v8 shim
// NOTE: arguments precondition checked in js wrapper file
static v8::Handle<v8::Value>
SplitWords(const v8::Arguments &args) {
  v8::HandleScope scope;

  // prepare ICU-compatible strings
  v8::Local<v8::String> localeStr(args[0]->ToString());
  v8::Local<v8::String> textStr(args[1]->ToString());
  const char *localeArg = *v8::String::AsciiValue(localeStr);

  v8::String::Value textValue(textStr);
  const uint16_t *textBuffer = *textValue;
  if (textBuffer == NULL) { return Throw("Error obtaining unicode string from v8::String."); }

  UnicodeString text(textBuffer, textStr->Length());
  if (text.isBogus()) { return Throw("Failed to create UnicodeString."); }

  // prepare iterator
  UErrorCode err = U_ZERO_ERROR;
  Locale locale = Locale::createFromName(localeArg);

  BreakIterator *iter = BreakIterator::createWordInstance(locale, err);
  if (U_FAILURE(err)) {
    ErrorCode errCode;
    errCode.set(err);

    return Throw(errCode.errorName());
  }

  iter->setText(text);

  // iterate and store results
  v8::Local<v8::Array> results = v8::Array::New();
  //v8::Local<v8::Array> results(v8::Array::New());
  int resultIdx = 0;
  int previousIdx = 0;
  int idx = -1;

  while ((idx = iter->next()) != -1) {
    const uint16_t *wordStart = textBuffer + previousIdx;
    v8::Local<v8::String> word;

    results->Set(resultIdx++, v8::String::New(wordStart, idx - previousIdx));
    previousIdx = idx;
  }

  // finish
  delete iter;
  return scope.Close(results);
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

