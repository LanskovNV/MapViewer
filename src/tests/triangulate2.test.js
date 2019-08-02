const THREE = require('three');
const intersections = require('./intersections');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate square with a square shelf', () => {
  let poly = new THREE.Geometry();
  const vertices = [
    [100, 100],
    [100, 200],
    [200, 200],
    [200, 160],
    [180, 160],
    [180, 140],
    [200, 140],
    [200, 100]
  ];

  for (let i = 0; i < vertices.length; i++) {
    poly.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], 0));
  }

  let triangles = THREE.ShapeUtils.triangulateShape(poly.vertices, []);

  console.log('triangulate square with a square shelf');
  console.log(triangles);

  expect(triangles.length).toEqual(vertices.length - 2);
  expect(intersections(triangles, vertices)).toEqual(false);
});
