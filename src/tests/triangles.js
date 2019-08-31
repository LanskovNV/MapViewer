function createTriangles(vertices) {
  let triangles = [];
  for (let j = 0; j < vertices.length; j += 3) {
    let triangle = [vertices[j], vertices[j + 1], vertices[j + 2]];
    triangles.push(triangle);
  }
  return triangles;
}
module.exports = createTriangles;
