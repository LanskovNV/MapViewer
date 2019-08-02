const THREE = require('three');
const intersections = require('./intersections');
/*
    triangulation is correct if:
       - number of triangles equals to number of vertices - 2
       - triangles are on vertices
       - no intersections
    */

test('triangulate square', () => {
  let square = new THREE.Geometry();
  const vertices = [[100, 100], [100, 200], [200, 200], [200, 100]];

  for (let i = 0; i < vertices.length; i++) {
    square.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], 0));
  }

  let triangles = THREE.ShapeUtils.triangulateShape(square.vertices, []);

  console.log('triangulate square');
  console.log(triangles);

  expect(triangles.length).toEqual(vertices.length - 2);
  expect(intersections(triangles, vertices)).toEqual(false);
});
