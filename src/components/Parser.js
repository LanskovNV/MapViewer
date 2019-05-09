import { injectIntl } from 'react-intl';

import mapFile11 from '../readyMaps/Davis/streets';
import mapFile12 from '../readyMaps/Davis/houses';
import mapFile13 from '../readyMaps/Davis/water';
import mapFile2 from '../readyMaps/Alexandria.osm.geojson';
import mapFile3 from '../readyMaps/Cairo.osm.geojson';
import { status, saveByteArray, HandleFile, ClearFiles } from './Handle';
import { PickStreets, PickHouses, PickWater } from './DataFilter';
import { FilterStreets, FilterHouses, FilterWater } from './ItemsFilter';
import { ConvertCoordinates } from './CoordinatesConversion';

class Parser {
  static LoadPreparedMap(e) {
    let files = new Array(3);
    const name = e.target.id;
    if (name === 'preloadMap1') {
      files[0] = mapFile11;
      files[1] = mapFile12;
      files[2] = mapFile13;
    } else if (name === 'preloadMap2') {
      files[0] = mapFile2;
    } else if (name === 'preloadMap3') {
      files[0] = mapFile3;
    }
    //TODO 'files' contains jsons ready for display, need to send them to corresponding function
  }
  static PickUsefulFromGeoJSONToTXT() {
    const FIRST_ELEMENT = 0;
    const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

    if (file !== undefined) {
      if (document.getElementById('restProcFile') !== null) {
        ClearFiles();
      }

      saveByteArray([''], 'rest.txt', 'restProcFile');
      loading(file, callbackDataProcess, callbackEnd);
    }
  }
}

function callbackDataProcess(data) {
  const restFile = document.getElementById('restProcFile');
  const str_data = String.fromCharCode.apply(null, new Uint8Array(data)),
    str_valid_json = str_data.substr(0, str_data.lastIndexOf('\n')),
    str_rest = str_data.substr(
      str_data.lastIndexOf('\n'),
      str_data.length - str_data.lastIndexOf('\n')
    );

  if (str_valid_json.length === 0) {
    return;
  }
  //Get rest part from previous chunk and save new rest part
  fetch(restFile.href)
    .then(status)
    .then(function(data_rest) {
      window.URL.revokeObjectURL(restFile.href);
      const str_data_rest = String.fromCharCode.apply(
          null,
          new Uint8Array(data_rest)
        ),
        buf_rest = str_data_rest + str_valid_json;
      let json_temp;

      if (buf_rest.indexOf('FeatureCollection') > 0) {
        let str_json =
          '{"items":[' +
          buf_rest.substr(41, buf_rest.lastIndexOf(',') - 41) +
          ']}';
        json_temp = JSON.parse(str_json);
      } else {
        let str_json =
          '{"items":[' +
          buf_rest.substr(1, buf_rest.lastIndexOf(',') - 1) +
          ']}';
        json_temp = JSON.parse(str_json);
      }

      let streets = PickStreets(json_temp),
        houses = PickHouses(json_temp),
        water = PickWater(json_temp);

      if (streets.items.length > 0) {
        streets = FilterStreets(streets);
        HandleFile(streets, 'streets');
      }
      if (houses.items.length > 0) {
        houses = FilterHouses(houses);
        HandleFile(houses, 'houses');
      }
      if (water.items.length > 0) {
        water = FilterWater(water);
        HandleFile(water, 'water');
      }

      const blob = new Blob([str_rest], { type: 'text/json' }),
        f = new File([blob], restFile.download, { type: 'text/json' });
      restFile.href = window.URL.createObjectURL(f);
    })
    .catch(function(err) {
      alert(err);
    });
}

function callbackEnd(data) {
  let restFile = document.getElementById('restProcFile');
  let str_data = String.fromCharCode.apply(null, new Uint8Array(data));

  //Get rest part from previous chunk and save new rest part
  fetch(restFile.href)
    .then(status)
    .then(function(data_rest) {
      window.URL.revokeObjectURL(restFile.href);

      const buf_rest =
        String.fromCharCode.apply(null, new Uint8Array(data_rest)) + str_data;
      let str_json = '{"items":[' + buf_rest.substr(1, buf_rest.length - 1);
      let json_temp = JSON.parse(str_json);

      let streets = PickStreets(json_temp),
        houses = PickHouses(json_temp),
        water = PickWater(json_temp);

      if (streets.items.length > 0) {
        streets = FilterStreets(streets);
        HandleFile(streets, 'streets');
      }
      if (houses.items.length > 0) {
        houses = FilterHouses(houses);
        HandleFile(houses, 'houses');
      }
      if (water.items.length > 0) {
        water = FilterWater(water);
        HandleFile(water, 'water');
      }
    })
    .then(function() {
      ConvertCoordinates(['streets', 'houses', 'water']);
    })
    .catch(function(err) {
      alert(err);
    });

  //alert('End. All data successfully read');
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
