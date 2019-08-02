const THREE = require('three');
const intersections = require('./intersections');

/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate russian "Г"', () => {
  let poly = new THREE.Geometry();
  const vertices = [
    [0, 0],
    [0, 400],
    [300, 400],
    [300, 300],
    [100, 300],
    [100, 0]
  ];

  for (let i = 0; i < vertices.length; i++) {
    poly.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], 0));
  }

  let triangles = THREE.ShapeUtils.triangulateShape(poly.vertices, []);

  console.log('triangulate russian "Г"');
  console.log(triangles);

  expect(triangles.length).toEqual(vertices.length - 2);
  expect(intersections(triangles, vertices)).toEqual(false);
});
