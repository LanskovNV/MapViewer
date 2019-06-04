import {
  ClearFiles,
  ClearTempFiles,
  HandleFile,
  saveByteArray,
  status
} from '../../components/Handle';
import loading from './Loading';
import { PickHouses, PickStreets, PickWater } from './DataFilter';
import { FilterFile } from './ItemsFilter';
import { ConvertCoordinates } from './CoordinatesConversion';
import { Assemble } from './FilesAssembler';

/*
 * @desc dynamic map load
 */
export default callback => {
  const FIRST_ELEMENT = 0;
  const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

  if (file !== undefined) {
    // File selected
    if (
      document.getElementById('streetsProcFile') !== null ||
      document.getElementById('housesProcFile') !== null ||
      document.getElementById('waterProcFile') !== null
    ) {
      // Already loaded map before
      ClearFiles();
    }

    saveByteArray([''], 'rest.txt', 'restProcFile');
    loading(file, callbackDataProcess, callbackEnd, callback);
  }

  /*
   * @desc processes data chunk
   * @param data - read data
   */
  function callbackDataProcess(data) {
    const restFile = document.getElementById('restProcFile');
    const str_data = String.fromCharCode.apply(null, new Uint8Array(data)),
      str_valid_json = str_data.substr(0, str_data.lastIndexOf('\n')),
      str_rest = str_data.substr(
        str_data.lastIndexOf('\n'),
        str_data.length - str_data.lastIndexOf('\n')
      );

    //Get rest part from previous chunk and save new rest part
    fetch(restFile.href)
      .then(status)
      .then(function(data_rest) {
        window.URL.revokeObjectURL(restFile.href);
        const str_data_rest = String.fromCharCode.apply(
          null,
          new Uint8Array(data_rest)
        );
        if (str_valid_json.length === 0) {
          // Nothing can be turned into json
          let str_rest_prolong = str_data_rest + str_data;
          const blob = new Blob([str_rest_prolong], { type: 'text/json' }),
            f = new File([blob], restFile.download, { type: 'text/json' });
          restFile.href = window.URL.createObjectURL(f);
          return;
        }
        const buf_rest = str_data_rest + str_valid_json;
        let json_temp;

        if (buf_rest.indexOf('FeatureCollection') > 0) {
          // Read the beginning of geojson file
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
          streets = FilterFile(streets);
          HandleFile(streets, 'streets');
        }
        if (houses.items.length > 0) {
          houses = FilterFile(houses);
          HandleFile(houses, 'houses');
        }
        if (water.items.length > 0) {
          water = FilterFile(water);
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

  /*
   * @desc processes last data chunk
   * @param data - read data
   */
  function callbackEnd(data, callback) {
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
          streets = FilterFile(streets);
          HandleFile(streets, 'streets');
        }
        if (houses.items.length > 0) {
          houses = FilterFile(houses);
          HandleFile(houses, 'houses');
        }
        if (water.items.length > 0) {
          water = FilterFile(water);
          HandleFile(water, 'water');
        }
      })
      .then(ConvertCoordinates)
      .then(Assemble)
      .then(ClearTempFiles)
      .then(callback)
      .catch(function(err) {
        alert(err);
      });
  }
};
