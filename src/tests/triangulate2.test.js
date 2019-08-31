const earcut = require('earcut');
const intersections = require('./intersections');
const createTriangles = require('./triangles');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate square with a square shelf', () => {
  const geometry = [
    [
      [100, 100],
      [100, 200],
      [200, 200],
      [200, 160],
      [180, 160],
      [180, 140],
      [200, 140],
      [200, 100]
    ]
  ];

  const data = earcut.flatten(geometry);
  let triangles = createTriangles(
    earcut(data.vertices, data.holes, data.dimensions)
  );

  console.log('triangulate square with a square shelf');
  console.log(triangles);

  expect(triangles.length).toEqual(geometry[0].length - 2);
  expect(intersections(triangles, geometry[0])).toEqual(false);
});
