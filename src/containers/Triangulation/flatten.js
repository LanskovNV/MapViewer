const flattenCoords = data => {
  const dim = data[0][0].length;
  const result = { vertices: [], holes: [], dimensions: dim };
  let holeIndex = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      for (let d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
    }
    if (i > 0) {
      holeIndex += data[i - 1].length;
      result.holes.push(holeIndex);
    }
  }

  return result;
};

export default flattenCoords;
