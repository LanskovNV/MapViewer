function FilterStreets(json_data) {
  let result = JSON.parse('{"points":[]}'),
    item = JSON.parse(
      '{"point":{"type":"","coordinates":[],"properties":{"highway":""}}}'
    );
  for (let i = 0; i < json_data.points.length; i++) {
    item.point.type = json_data.points[i].geometry.type;
    item.point.coordinates = json_data.points[i].geometry.coordinates;
    item.point.properties.highway = json_data.points[i].properties.highway;
    result.points.push(item.point);
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
