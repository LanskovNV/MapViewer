function ConvertCoordinates(coords) {
  const denum = 180;
  const newMax = 65536;

  coords[0] = (coords[0] / denum) * newMax;
  coords[1] = (coords[1] / denum) * newMax;

  return coords;
}

export default ConvertCoordinates;
