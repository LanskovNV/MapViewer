export default function updateObjects(objects, toDraw) {
  objects.forEach(o => {
    o.data = document.getElementById(o.name + 'ProcFile');
    // updating toDraw flags
    if (o.name === 'houses') {
      o.toDraw = toDraw.isHouses;
    } else if (o.name === 'streets') {
      o.toDraw = toDraw.isStreets;
    } else {
      o.toDraw = toDraw.isWater;
    }
  });
  return objects;
}
