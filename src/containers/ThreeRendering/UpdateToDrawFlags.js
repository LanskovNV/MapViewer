/**
 * @desc updating draw flags
 * @param elem to draw struct
 * @param flags boolean flags
 * @returns {*}
 */
export default function updateToDrawFlags(elem, flags) {
  if (elem.name === 'houses') {
    elem.toDraw = flags.isHouses;
  } else if (elem.name === 'streets') {
    elem.toDraw = flags.isStreets;
  } else if (elem.name === 'water') {
    elem.toDraw = flags.isWater;
  }
  return elem;
}
