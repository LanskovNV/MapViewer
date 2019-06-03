import { injectIntl } from 'react-intl';
import mapFile11 from '../readyMaps/Davis/streets';
import mapFile12 from '../readyMaps/Davis/houses';
import mapFile13 from '../readyMaps/Davis/water';
import mapFile21 from '../readyMaps/Cairo/streets';
import mapFile22 from '../readyMaps/Cairo/houses';
import mapFile23 from '../readyMaps/Cairo/water';
import mapFile31 from '../readyMaps/Alexandria/streets';
import mapFile32 from '../readyMaps/Alexandria/houses';
import mapFile33 from '../readyMaps/Alexandria/water';
import {
  status,
  saveByteArray,
  HandleFile,
  ClearTempFiles,
  ClearFiles
} from './Handle';
import { PickStreets, PickHouses, PickWater } from './DataFilter';
import { FilterStreets, FilterHouses, FilterWater } from './ItemsFilter';
import { ConvertCoordinates } from './CoordinatesConversion';
import { Assemble } from './FilesAssembler';
import React from 'react';
import PropTypes from 'prop-types';

class Parser extends React.Component {
  constructor() {
    super();
    this.state = { percent: 0, step: 0, isLoading: false };
    this.updateLoading = this.updateLoading.bind(this);
    this.updateLoadingPercent = this.updateLoadingPercent.bind(this);
  }
  updateLoading = function() {
    this.setState({ isLoading: !this.state.isLoading });
    this.props.handleLoading(!this.state.isLoading);
  };
  updateLoadingStep = function(newStep) {
    this.setState({ step: newStep });
  };
  updateLoadingPercent = function() {
    this.setState({ percent: this.state.percent + this.step });
    this.props.handleLoadingPercent(this.state.percent + this.step);
  };
  shouldComponentUpdate() {
    return false;
  }

  LoadPreparedMap = function(e) {
    let files = new Array(3);
    const name = e.target.id;

    if (name === 'preloadMap1') {
      files[0] = mapFile11;
      files[1] = mapFile12;
      files[2] = mapFile13;
    } else if (name === 'preloadMap2') {
      files[0] = mapFile21;
      files[1] = mapFile22;
      files[2] = mapFile23;
    } else if (name === 'preloadMap3') {
      files[0] = mapFile31;
      files[1] = mapFile32;
      files[2] = mapFile33;
    }

    if (
      document.getElementById('streetsProcFile') !== null ||
      document.getElementById('housesProcFile') !== null ||
      document.getElementById('waterProcFile') !== null
    ) {
      ClearFiles();
    }

    saveByteArray(
      [JSON.stringify(files[0])],
      'streets.json',
      'streetsProcFile'
    );
    saveByteArray([JSON.stringify(files[1])], 'houses.json', 'housesProcFile');
    saveByteArray([JSON.stringify(files[2])], 'water.json', 'waterProcFile');
  };

  PickUsefulFromGeoJSONToTXT = function() {
    const FIRST_ELEMENT = 0;
    const file = document.getElementById('loadedMap').files[FIRST_ELEMENT];

    if (file !== undefined) {
      if (
        document.getElementById('streetsProcFile') !== null ||
        document.getElementById('housesProcFile') !== null ||
        document.getElementById('waterProcFile') !== null
      ) {
        ClearFiles();
      }

      saveByteArray([''], 'rest.txt', 'restProcFile');
      loading(file, callbackDataProcess, callbackEnd);
    }
  };
}

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
        let str_rest_prolong = str_data_rest + str_data;
        const blob = new Blob([str_rest_prolong], { type: 'text/json' }),
          f = new File([blob], restFile.download, { type: 'text/json' });
        restFile.href = window.URL.createObjectURL(f);
        return;
      }
      const buf_rest = str_data_rest + str_valid_json;
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
    .then(ConvertCoordinates)
    .then(Assemble)
    .then(ClearTempFiles)
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

Parser.propTypes = {
  handleLoading: PropTypes.func,
  handleLoadingPercent: PropTypes.func
};
