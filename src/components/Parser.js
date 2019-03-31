import { injectIntl } from 'react-intl';

class Parser {
  static PickUsefulFromGeoJSONToTXT() {
    const FIRST_ELEMENT = 0;
    const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

    loading(
      file,
      function(data) {
        // TODO Add data processing
        if (data === null) {
          alert(data);
        }
      },
      function() {
        alert('End. All data successfully read');
      }
    );
  }
}

function min(a, b) {
  return a < b ? a : b;
}

function loading(file, callbackProgress, callbackEnd) {
  const CHUNK_SIZE = 10 * 1024;
  let start = 0;
  let end;
  let slice;
  if (file.size === 0) {
    callbackEnd();
  }
  while (start < file.size) {
    end = min(start + CHUNK_SIZE, file.size);
    slice = file.slice(start, end);
    const reader = new FileReader();
    reader.size = CHUNK_SIZE;
    reader.offset = start;
    reader.onload = function(evt) {
      callbackRead(this, file, evt, callbackProgress, callbackEnd);
    };
    reader.readAsArrayBuffer(slice);
    start += CHUNK_SIZE;
  }
}

function callbackRead(reader, file, evt, callbackProgress, callbackEnd) {
  callbackProgress(evt.target.result);
  if (reader.offset + reader.size >= file.size) {
    callbackEnd();
  }
}

export default injectIntl(Parser);
