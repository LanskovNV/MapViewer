function PickStreets(json_data) {
  let result = JSON.parse('{"points":[]}');
  for (let i = 0; i < json_data.points.length; i++) {
    if (
      json_data.points[i] &&
      json_data.points[i].properties &&
      json_data.points[i].properties.highway &&
      (json_data.points[i].properties.highway === 'residential' ||
        json_data.points[i].properties.highway === 'service' ||
        json_data.points[i].properties.highway === 'footway')
    ) {
      result.points.push(json_data.points[i]);
    }
  }
  return result;
}

function PickHouses(json_data) {
  return json_data;
}

function PickWater(json_data) {
  return json_data;
}

export { PickStreets, PickHouses, PickWater };
