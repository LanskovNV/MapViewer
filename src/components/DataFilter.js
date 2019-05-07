function PickStreets(json_data) {
  let result = JSON.parse('{"items":[]}');
  for (let i = 0; i < json_data.items.length; i++) {
    if (
      json_data.items[i] &&
      json_data.items[i].geometry &&
      json_data.items[i].geometry.type &&
      json_data.items[i].geometry.type !== 'Point' &&
      json_data.items[i].properties &&
      json_data.items[i].properties.highway &&
      (json_data.items[i].properties.highway === 'residential' ||
        json_data.items[i].properties.highway === 'service' ||
        json_data.items[i].properties.highway === 'footway')
    ) {
      result.items.push(json_data.items[i]);
    }
  }
  return result;
}

function PickHouses(json_data) {
  let result = JSON.parse('{"items":[]}');
  for (let i = 0; i < json_data.items.length; i++) {
    if (
      json_data.items[i] &&
      json_data.items[i].geometry &&
      json_data.items[i].geometry.type &&
      json_data.items[i].geometry.type !== 'Point' &&
      json_data.items[i].properties &&
      json_data.items[i].properties.building &&
      (json_data.items[i].properties.building === 'yes' ||
        json_data.items[i].properties.building === 'house' ||
        json_data.items[i].properties.building === 'residential' ||
        json_data.items[i].properties.building === 'apartments' ||
        json_data.items[i].properties.building === 'industrial' ||
        json_data.items[i].properties.building === 'commercial' ||
        json_data.items[i].properties.building === 'school' ||
        json_data.items[i].properties.building === 'retail' ||
        json_data.items[i].properties.building === 'church' ||
        json_data.items[i].properties.building === 'warehouse' ||
        json_data.items[i].properties.building === 'service' ||
        json_data.items[i].properties.building === 'university' ||
        json_data.items[i].properties.building === 'public' ||
        json_data.items[i].properties.building === 'hospital' ||
        json_data.items[i].properties.building === 'hotel' ||
        json_data.items[i].properties.building === 'dormitory' ||
        json_data.items[i].properties.building === 'college' ||
        json_data.items[i].properties.building === 'kindergarten')
    ) {
      result.items.push(json_data.items[i]);
    }
  }
  return result;
}

function PickWater(json_data) {
  let result = JSON.parse('{"items":[]}');
  for (let i = 0; i < json_data.items.length; i++) {
    if (
      json_data.items[i] &&
      json_data.items[i].geometry &&
      json_data.items[i].geometry.type &&
      json_data.items[i].geometry.type !== 'Point' &&
      json_data.items[i].properties &&
      ((json_data.items[i].properties.waterway &&
        (json_data.items[i].properties.waterway === 'river' ||
          json_data.items[i].properties.waterway === 'canal' ||
          json_data.items[i].properties.waterway === 'riverbank')) ||
        (json_data.items[i].properties.natural &&
          json_data.items[i].properties.natural === 'water'))
    ) {
      result.items.push(json_data.items[i]);
    }
  }
  return result;
}

export { PickStreets, PickHouses, PickWater };
