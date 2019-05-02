import { injectIntl } from 'react-intl';
import mapFile1 from '../readyMaps/Davis.osm.geojson';
import mapFile2 from '../readyMaps/Alexandria.osm.geojson';
import mapFile3 from '../readyMaps/Cairo.osm.geojson';

const KByte100 = 100 * 1024;

function status(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.arrayBuffer();
}

class Parser {
  static LoadPreparedMap(e) {
    let file;
    const name = e.target.id;
    if (name === 'preloadMap1') {
      file = mapFile1;
    } else if (name === 'preloadMap2') {
      file = mapFile2;
    } else if (name === 'preloadMap3') {
      file = mapFile3;
    }
    fetch(file)
      .then(status)
      .then(function(data) {
        // TODO Have ArrayBuffer, need to process it
        alert(data.byteLength);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  static PickUsefulFromGeoJSONToTXT() {
    const FIRST_ELEMENT = 0;
    const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

    let sampleBytes = '';
    let restBytes = '';

    // TODO handle previously saved map when replace map

    saveByteArray([sampleBytes], 'temp1.txt', 'temp1ProcFile');
    saveByteArray([restBytes], 'rest.txt', 'restProcFile');
    loading(file, callbackDataProcess, callbackEnd);
    //window.URL.revokeObjectURL(tempFile.href);
  }
}

function saveByteArray(data, name, idName) {
  let a = document.createElement('a');
  document.head.appendChild(a);
  const blob = new Blob(data, { type: 'text/json' }),
    f = new File([blob], name, { type: 'text/json' });
  a.href = window.URL.createObjectURL(f);
  a.download = name;
  a.id = idName;
}

function handleTemp(n, buf_rest) {
  let tempFile = document.getElementById('temp' + n + 'ProcFile');
  if (tempFile === null) {
    saveByteArray([''], 'temp' + n + '.txt', 'temp' + n + 'ProcFile');
    tempFile = document.getElementById('temp' + n + 'ProcFile');
  }
  fetch(tempFile.href)
    .then(status)
    .then(function(data_temp) {
      if (data_temp.byteLength < KByte100) {
        window.URL.revokeObjectURL(tempFile.href);
        let buf =
          String.fromCharCode.apply(null, new Uint8Array(data_temp)) + buf_rest;
        let blob = new Blob([buf], { type: 'text/json' }),
          f = new File([blob], tempFile.download, { type: 'text/json' }),
          url = window.URL.createObjectURL(f);
        tempFile.href = url;
        buf = null;
        f = null;
        blob = null;
        url = null;
      } else if (tempFile !== null) {
        handleTemp(++n, buf_rest);
      }
    })
    .catch(function(err) {
      alert(err);
    });
}

function callbackDataProcess(data) {
  const restFile = document.getElementById('restProcFile');
  const str_data = String.fromCharCode.apply(null, new Uint8Array(data)),
    str_valid_json = str_data.substr(0, str_data.lastIndexOf('\n')),
    str_rest = str_data.substr(str_data.lastIndexOf('\n'), str_data.length);

  //Get rest part from previous chunk and save new rest part
  fetch(restFile.href)
    .then(status)
    .then(function(data_rest) {
      window.URL.revokeObjectURL(restFile.href);
      const buf_rest =
        String.fromCharCode.apply(null, new Uint8Array(data_rest)) +
        str_valid_json;
      let n = 1;

      handleTemp(n, buf_rest);

      const blob = new Blob([str_rest], { type: 'text/json' }),
        f = new File([blob], restFile.download, { type: 'text/json' });
      restFile.href = window.URL.createObjectURL(f);
    })
    .catch(function(err) {
      alert(err);
    });
}

async function callbackEnd(data) {
  let restFile = document.getElementById('restProcFile');
  let str_data = String.fromCharCode.apply(null, new Uint8Array(data));

  //Get rest part from previous chunk and save new rest part
  fetch(restFile.href)
    .then(status)
    .then(function(data_rest) {
      window.URL.revokeObjectURL(restFile.href);
      const buf_rest =
        String.fromCharCode.apply(null, new Uint8Array(data_rest)) + str_data;
      let n = 1;

      handleTemp(n, buf_rest);
    })
    .catch(function(err) {
      alert(err);
    });
  document.head.removeChild(document.getElementById('restProcFile'));

  alert('End. All data successfully read');
}

function min(a, b) {
  return a < b ? a : b;
}

function loading(file, callbackProgressF, callbackEndF) {
  const CHUNK_SIZE = 10 * 1024;
  let start = 0;
  let end;
  let slice;
  const extension = file.name.slice(file.name.lastIndexOf('.') - 1 + 2);
  if (file === undefined) {
    return;
  }
  if (extension !== 'json' && extension !== 'geojson') {
    alert('Wrong extension. Should be .json or .geojson');
    return;
  }
  if (file.size === 0) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function(evt) {
    reader.offset = start;
    callbackRead(this, file, evt, callbackProgressF, callbackEndF);
    start += CHUNK_SIZE;
    Load();
  };
  reader.size = CHUNK_SIZE;

  Load();
  function Load() {
    if (start < file.size) {
      end = min(start + CHUNK_SIZE, file.size);
      slice = file.slice(start, end);
      reader.readAsArrayBuffer(slice);
      end = null;
      slice = null;
    }
  }
}

function callbackRead(reader, file, evt, callbackProgressF, callbackEndF) {
  if (reader.offset + reader.size < file.size) {
    callbackProgressF(evt.target.result);
  } else {
    callbackEndF(evt.target.result);
  }
}

export default injectIntl(Parser);
