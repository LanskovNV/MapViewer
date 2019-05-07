function TransformMultipolygon(arr_multipolygons_coord) {
  let arr_lines_coords = new Array(0);
  //Multipolygon processing
  for (let i = 0; i < arr_multipolygons_coord.length; i++) {
    //Polygon processing
    let polygon = JSON.parse('{"coordinates":[], "fill":"yes"}');
    polygon.coordinates = arr_multipolygons_coord[i][0];
    arr_lines_coords.push(polygon);
    //Polygon holes processing
    for (let j = 1; j < arr_multipolygons_coord[i].length; j++) {
      let hole = JSON.parse('{"coordinates":[], "fill":"no"}');
      hole.coordinates = arr_multipolygons_coord[i][j];
      arr_lines_coords.push(hole);
    }
  }
  return arr_lines_coords;
}

export { TransformMultipolygon };
