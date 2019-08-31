/*
 * @desc deletes unneeded data present in each item and transform multipolygons into lines
 * @param json_data - data to filter stored as json file
 * @return result - filtered json file
 */
function FilterFile(json_data) {
  let result = JSON.parse('{"items":[]}');
  for (let i = 0; i < json_data.items.length; i++) {
    let item = JSON.parse('{"coordinates":[]}');
    item.coordinates = json_data.items[i].geometry.coordinates;
    item.type = json_data.items[i].geometry.type;
    result.items.push(item);
  }
  return result;
}

export { FilterFile };
