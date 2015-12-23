#include <nan.h>
// ICU includes
#include <unicode/brkiter.h>
#include <unicode/errorcode.h>
#include <unicode/unistr.h>

namespace wordsplit {

using v8::Value;
using v8::Local;
using v8::FunctionTemplate;
using v8::Object;
using v8::Array;
using v8::String;

// v8 shim
// NOTE: arguments precondition checked in js wrapper file
void SplitWords(const Nan::FunctionCallbackInfo<Value>& info) {
  // Ignore the first parameter if we have 2 because ICU works great with en_US locale
  const char *cLocaleArg = "en_US";
  int textIndex;
  if (info.Length() == 2) {
      textIndex = 1;
  } else {
      textIndex = 0;
  }
  Local<String> text = info[textIndex]->ToString(Nan::GetCurrentContext()).ToLocalChecked();

  uint16_t *cTextArg = new uint16_t[text->Length()+1];
  text->Write(cTextArg, 0, text->Length());

  if (cTextArg == NULL) {
    Nan::ThrowError("Error obtaining unicode string from v8::String");
    delete cTextArg;
    return;
  }

  icu::UnicodeString uTextArg(cTextArg, text->Length());
  if (uTextArg.isBogus()) {
    Nan::ThrowError("Failed to create UnicodeString");
    delete cTextArg;
    return;
  }

  // prepare iterator
  UErrorCode err = U_ZERO_ERROR;
  Locale locale = Locale::createFromName(cLocaleArg);

  BreakIterator *iter = BreakIterator::createWordInstance(locale, err);
  if (U_FAILURE(err)) {
    ErrorCode errCode;
    errCode.set(err);

    Nan::ThrowError(errCode.errorName());
    delete cTextArg;
    return;
  }

  iter->setText(uTextArg);

  // iterate and store results
  Local<Array> results = Nan::New<Array>();
  int resultIdx = 0;
  int previousIdx = 0;
  int idx = -1;

  while ((idx = iter->next()) != -1) {
    const uint16_t *wordStart = cTextArg + previousIdx;

    Nan::Set(results, resultIdx++, Nan::New<String>(wordStart, idx - previousIdx).ToLocalChecked());
    previousIdx = idx;
  }

  // finish
  delete iter;
  delete cTextArg;
  info.GetReturnValue().Set(results);
}

void Init(Local<Object> exports) {
    exports->Set(Nan::New("splitWords").ToLocalChecked(),
            Nan::New<FunctionTemplate>(SplitWords)->GetFunction());
}

NODE_MODULE(addon, Init)

}
