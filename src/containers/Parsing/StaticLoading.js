import mapFile11 from '../../readyMaps/Davis/streets';
import mapFile12 from '../../readyMaps/Davis/houses';
import mapFile13 from '../../readyMaps/Davis/water';
import mapFile21 from '../../readyMaps/Cairo/streets';
import mapFile22 from '../../readyMaps/Cairo/houses';
import mapFile23 from '../../readyMaps/Cairo/water';
import mapFile31 from '../../readyMaps/Alexandria/streets';
import mapFile32 from '../../readyMaps/Alexandria/houses';
import mapFile33 from '../../readyMaps/Alexandria/water';
import { ClearFiles, saveByteArray } from './Handle';

export default e => {
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

  saveByteArray([JSON.stringify(files[0])], 'streets.json', 'streetsProcFile');
  saveByteArray([JSON.stringify(files[1])], 'houses.json', 'housesProcFile');
  saveByteArray([JSON.stringify(files[2])], 'water.json', 'waterProcFile');
};
