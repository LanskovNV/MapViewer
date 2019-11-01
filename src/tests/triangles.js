function createTrianglesFromIndices(indices, vertices) {
  let triangles = [];
  for (let j = 0; j < indices.length; j += 3) {
    let triangle = [
      vertices[indices[j]],
      vertices[indices[j + 1]],
      vertices[indices[j + 2]]
    ];
    triangles.push(triangle);
  }
  return triangles;
}

export default createTrianglesFromIndices;
