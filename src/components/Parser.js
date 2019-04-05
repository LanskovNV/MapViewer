import { injectIntl } from 'react-intl';
import mapFile1 from '../readyMaps/Davis.osm.geojson';
import mapFile2 from '../readyMaps/Alexandria.osm.geojson';
import mapFile3 from '../readyMaps/Cairo.osm.geojson';

class Parser {
  static LoadPreparedMap(e) {
    let file;
    let name = e.target.id;
    console.log(name);
    if (name === 'preloadMap1') {
      file = mapFile1;
    } else if (name === 'preloadMap2') {
      file = mapFile2;
    } else if (name === 'preloadMap3') {
      file = mapFile3;
    }
    fetch(file)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }

        // Examine the text in the response
        response.arrayBuffer().then(function(data) {
          // TODO Have ArrayBuffer, need to process it
          alert('File size: ' + data.byteLength);
        });
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }
  static PickUsefulFromGeoJSONToTXT() {
    const FIRST_ELEMENT = 0;
    const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

    loading(file, callbackDataProcess, callbackEnd);
  }
}

function callbackDataProcess(data) {
  // TODO Add data processing
  if (data === null) {
    alert(data);
  }
}

function callbackEnd() {
  alert('End. All data successfully read');
}

function min(a, b) {
  return a < b ? a : b;
}

function loading(file, callbackProgress, callbackEnd) {
  const CHUNK_SIZE = 10 * 1024;
  let start = 0;
  let end;
  let slice;
  const extension = file.name.slice(
    ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
  );
  if (file === undefined) {
    return;
  }
  if (extension !== 'json' && extension !== 'geojson') {
    alert('Wrong extension. Should be .json or .geojson');
    return;
  }
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
