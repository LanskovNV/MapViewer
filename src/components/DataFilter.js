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
  let result = JSON.parse('{"points":[]}');
  for (let i = 0; i < json_data.points.length; i++) {
    if (
      json_data.points[i] &&
      json_data.points[i].properties &&
      json_data.points[i].properties.building &&
      (json_data.points[i].properties.building === 'yes' ||
        json_data.points[i].properties.building === 'house' ||
        json_data.points[i].properties.building === 'residential' ||
        json_data.points[i].properties.building === 'apartments' ||
        json_data.points[i].properties.building === 'industrial' ||
        json_data.points[i].properties.building === 'commercial' ||
        json_data.points[i].properties.building === 'school' ||
        json_data.points[i].properties.building === 'retail' ||
        json_data.points[i].properties.building === 'church' ||
        json_data.points[i].properties.building === 'warehouse' ||
        json_data.points[i].properties.building === 'service' ||
        json_data.points[i].properties.building === 'university' ||
        json_data.points[i].properties.building === 'public' ||
        json_data.points[i].properties.building === 'hospital' ||
        json_data.points[i].properties.building === 'hotel' ||
        json_data.points[i].properties.building === 'dormitory' ||
        json_data.points[i].properties.building === 'college' ||
        json_data.points[i].properties.building === 'kindergarten')
    ) {
      result.points.push(json_data.points[i]);
    }
  }
  return result;
}

function PickWater(json_data) {
  let result = JSON.parse('{"points":[]}');
  for (let i = 0; i < json_data.points.length; i++) {
    if (
      json_data.points[i] &&
      json_data.points[i].properties &&
      ((json_data.points[i].properties.waterway &&
        (json_data.points[i].properties.waterway === 'river' ||
          json_data.points[i].properties.waterway === 'canal' ||
          json_data.points[i].properties.waterway === 'riverbank')) ||
        (json_data.points[i].properties.natural &&
          json_data.points[i].properties.natural === 'water'))
    ) {
      result.points.push(json_data.points[i]);
    }
  }
  return result;
}

export { PickStreets, PickHouses, PickWater };
