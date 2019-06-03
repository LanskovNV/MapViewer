import { TransformMultipolygon } from './MultipolygonTransformer';

/*
 * @desc deletes unneeded data present in each item and transform multipolygons into lines
 * @param json_data - data to filter stored as json file
 * @return result - filtered json file
 */
function FilterFile(json_data) {
  let result = JSON.parse('{"items":[]}');
  for (let i = 0; i < json_data.items.length; i++) {
    if (json_data.items[i].geometry.type === 'MultiPolygon') {
      let arr_polygons_as_lines = TransformMultipolygon(
        json_data.items[i].geometry.coordinates
      );
      for (let j = 0; j < arr_polygons_as_lines.length; j++) {
        result.items.push(arr_polygons_as_lines[j]);
      }
    } else {
      let item = JSON.parse('{"coordinates":[]}');
      item.coordinates = json_data.items[i].geometry.coordinates;
      result.items.push(item);
    }
  }
  return result;
}

export { FilterFile };
