const earcut = require('earcut');
const intersections = require('./intersections');
const createTriangles = require('./triangles');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate russian "Г"', () => {
  const geometry = [
    [[0, 0], [0, 400], [300, 400], [300, 300], [100, 300], [100, 0]]
  ];
  const data = earcut.flatten(geometry);

  let triangles = createTriangles(
    earcut(data.vertices, data.holes, data.dimensions)
  );
  console.log('triangulate russian "Г"');
  console.log(triangles);

  expect(triangles.length).toEqual(geometry[0].length - 2);
  expect(intersections(triangles, geometry[0])).toEqual(false);
});
