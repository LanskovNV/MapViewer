export default function updateToDrawFlags(elem, flags) {
  if (elem.name === 'houses') {
    elem.toDraw = flags.isHouses;
  } else if (elem.name === 'streets') {
    elem.toDraw = flags.isStreets;
  } else {
    elem.toDraw = flags.isWater;
  }
  return elem;
}
