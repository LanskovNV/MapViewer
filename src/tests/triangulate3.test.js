const THREE = require('three');
const intersections = require('./intersections');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate square with a square projection', () => {
  let poly = new THREE.Geometry();
  const vertices = [
    [0, 50],
    [0, 350],
    [300, 350],
    [300, 50],
    [200, 50],
    [200, 0],
    [150, 0],
    [150, 50]
  ];

  for (let i = 0; i < vertices.length; i++) {
    poly.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], 0));
  }

  let triangles = THREE.ShapeUtils.triangulateShape(poly.vertices, []);

  console.log('triangulate square with a square projection');
  console.log(triangles);

  expect(triangles.length).toEqual(vertices.length - 2);
  expect(intersections(triangles, vertices)).toEqual(false);
});
