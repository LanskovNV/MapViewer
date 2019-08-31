import updateToDrawFlags from './UpdateToDrawFlags';

/**
 * @desc update toDraw flags and parse ProcFiles
 * @param objects to draw objects structure
 * @param toDraw boolean array
 * @returns {*}
 */
export default function updateObjects(objects, toDraw) {
  objects.forEach(o => {
    o = updateToDrawFlags(o, toDraw);
    o.data = document.getElementById(o.name + 'ProcFile');
  });
  return objects;
}
