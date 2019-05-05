function FilterStreets(json_data) {
  let result = JSON.parse('{"points":[]}');
  result.points = new Array(json_data.points.length);
  for (let i = 0; i < json_data.points.length; i++) {
    let item = JSON.parse(
      '{"point":{"type":"","coordinates":[],"properties":{"highway":""}}}'
    );
    item.point.type = json_data.points[i].geometry.type;
    item.point.coordinates = json_data.points[i].geometry.coordinates;
    item.point.properties.highway = json_data.points[i].properties.highway;
    result.points[i] = item.point;
  }
  return result;
}

function FilterHouses(json_data) {
  let result = JSON.parse('{"points":[]}');
  result.points = new Array(json_data.points.length);
  for (let i = 0; i < json_data.points.length; i++) {
    let item = JSON.parse(
      '{"point":{"type":"","coordinates":[],"properties":{"building":""}}}'
    );
    item.point.type = json_data.points[i].geometry.type;
    item.point.coordinates = json_data.points[i].geometry.coordinates;
    item.point.properties.building = json_data.points[i].properties.building;
    result.points[i] = item.point;
  }
  return result;
}

function FilterWater(json_data) {
  let result = JSON.parse('{"points":[]}');
  result.points = new Array(json_data.points.length);
  for (let i = 0; i < json_data.points.length; i++) {
    let item = JSON.parse(
      '{"point":{"type":"","coordinates":[],"properties":{}}}'
    );
    item.point.type = json_data.points[i].geometry.type;
    item.point.coordinates = json_data.points[i].geometry.coordinates;
    if (json_data.points[i].properties.waterway) {
      item.point.properties.waterway = json_data.points[i].properties.waterway;
    } else {
      item.point.properties.natural = json_data.points[i].properties.natural;
    }
    result.points[i] = item.point;
  }
  return result;
}

export { FilterStreets, FilterHouses, FilterWater };
