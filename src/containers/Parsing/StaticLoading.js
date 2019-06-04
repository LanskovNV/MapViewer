import mapFile11 from '../../readyMaps/Davis/streets';
import mapFile12 from '../../readyMaps/Davis/houses';
import mapFile13 from '../../readyMaps/Davis/water';
import mapFile21 from '../../readyMaps/Cairo/streets';
import mapFile22 from '../../readyMaps/Cairo/houses';
import mapFile23 from '../../readyMaps/Cairo/water';
import mapFile31 from '../../readyMaps/Alexandria/streets';
import mapFile32 from '../../readyMaps/Alexandria/houses';
import mapFile33 from '../../readyMaps/Alexandria/water';
import mapFile41 from '../../readyMaps/SPB/streets';
import mapFile42 from '../../readyMaps/SPB/houses';
import mapFile43 from '../../readyMaps/SPB/water';
import { ClearFiles, saveByteArray } from '../../components/Handle';

/*
 * @desc loads map through static load
 * @param e - event
 */
export default name => {
  let files = new Array(3);
  if (name === 'Davis') {
    files[0] = mapFile11;
    files[1] = mapFile12;
    files[2] = mapFile13;
  } else if (name === 'Cairo') {
    files[0] = mapFile21;
    files[1] = mapFile22;
    files[2] = mapFile23;
  } else if (name === 'Alexandria') {
    files[0] = mapFile31;
    files[1] = mapFile32;
    files[2] = mapFile33;
  } else if (name === 'SPB') {
    files[0] = mapFile41;
    files[1] = mapFile42;
    files[2] = mapFile43;
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
