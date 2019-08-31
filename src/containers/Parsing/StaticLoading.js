import mapFile11 from '../../readyMaps/Stockton/streets';
import mapFile12 from '../../readyMaps/Stockton/houses';
import mapFile13 from '../../readyMaps/Stockton/water';
import mapFile21 from '../../readyMaps/Baku/streets';
import mapFile22 from '../../readyMaps/Baku/houses';
import mapFile23 from '../../readyMaps/Baku/water';
import mapFile31 from '../../readyMaps/Alexandria/streets';
import mapFile32 from '../../readyMaps/Alexandria/houses';
import mapFile33 from '../../readyMaps/Alexandria/water';
import { ClearFiles, saveByteArray } from './Handle';

/**
 * @desc loads map through static load
 */
export default name => {
  let files = new Array(3);
  if (name === 'Stockton') {
    files[0] = mapFile11;
    files[1] = mapFile12;
    files[2] = mapFile13;
  } else if (name === 'Baku') {
    files[0] = mapFile21;
    files[1] = mapFile22;
    files[2] = mapFile23;
  } else if (name === 'Alexandria') {
    files[0] = mapFile31;
    files[1] = mapFile32;
    files[2] = mapFile33;
  }

  if (
    document.getElementById('streetsProcFile') !== null ||
    document.getElementById('housesProcFile') !== null ||
    document.getElementById('waterProcFile') !== null
  ) {
    // Already loaded map before
    ClearFiles();
  }

  saveByteArray([JSON.stringify(files[0])], 'streets.json', 'streetsProcFile');
  saveByteArray([JSON.stringify(files[1])], 'houses.json', 'housesProcFile');
  saveByteArray([JSON.stringify(files[2])], 'water.json', 'waterProcFile');
};
