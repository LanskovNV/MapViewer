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
  return json_data;
}

function FilterWater(json_data) {
  return json_data;
}

export { FilterStreets, FilterHouses, FilterWater };
