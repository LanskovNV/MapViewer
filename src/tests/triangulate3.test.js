const earcut = require('earcut');
const intersections = require('./intersections');
const createTriangles = require('./triangles');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate square with a square projection', () => {
  const geometry = [
    [
      [0, 50],
      [0, 350],
      [300, 350],
      [300, 50],
      [200, 50],
      [200, 0],
      [150, 0],
      [150, 50]
    ]
  ];
  const data = earcut.flatten(geometry);

  let triangles = createTriangles(
    earcut(data.vertices, data.holes, data.dimensions)
  );
  console.log('triangulate square with a square projection');
  console.log(triangles);

  expect(triangles.length).toEqual(geometry[0].length - 2);
  expect(intersections(triangles, geometry[0])).toEqual(false);
});
