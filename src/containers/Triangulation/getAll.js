import earcut from './triangulate';
import flattenCoords from './flatten';

function earcutGetAll(geometry) {
  return doPolygon(geometry, geometry.length - 1);
}

function doPolygon(geometry, ind) {
  let triangles = [];
  let len = geometry[ind].length;
  triangles.push(doEarcut(geometry));

  for (let i = 0; i < len - 1; i++) {
    geometry[ind] = dataShift(geometry[ind]);
    triangles.push(doEarcut(geometry));
    for (let j = 0; j < ind; j++) {
      triangles.concat(doPolygon(geometry, j));
    }
  }

  geometry[ind] = dataShift(geometry[ind]);
  geometry[ind] = inverseData(geometry[ind]);

  triangles.push(doEarcut(geometry));
  for (let i = 0; i < len - 1; i++) {
    geometry[ind] = dataShift(geometry[ind]);
    triangles.push(doEarcut(geometry));
    for (let j = 0; j < ind; j++) {
      triangles.concat(doPolygon(geometry, j));
    }
  }
  return triangles;
}

function doEarcut(geometry) {
  //console.log(geometry);
  const data = flattenCoords(geometry);
  return earcut(data.vertices, data.holes);
}

function inverseData(data) {
  let dataInv = [];
  let len = data.length;
  for (let i = 0; i < len; i++) {
    dataInv.push(data[len - 1 - i]);
  }
  return dataInv;
}

function dataShift(data) {
  return data.slice(1, data.length).concat([data[0]]);
}

export default earcutGetAll;
