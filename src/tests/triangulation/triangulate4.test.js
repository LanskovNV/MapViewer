import isCorrect from '../isCorrect';
import flattenCoords from '../../containers/Triangulation/flatten';
import earcut from '../../containers/Triangulation/triangulate';
import createTrianglesFromIndices from '../triangles';

test('triangulate 4', () => {
  const geometry = [
    [
      [0, 0],
      [0, 100],
      [50, 50],
      [100, 100],
      [50, 150],
      [0, 100],
      [0, 200],
      [50, 150],
      [100, 200],
      [100, 100],
      [100, 0],
      [50, 50]
    ]
  ];
  const correctResults = [
    [
      [[0, 0], [0, 100], [50, 50]],
      [[0, 100], [0, 200], [50, 150]],
      [[50, 150], [100, 200], [100, 100]],
      [[50, 50], [100, 100], [100, 0]]
    ]
  ];

  //get array of indices of vertices in triangles
  const data = flattenCoords(geometry);
  let ind = earcut(data.vertices, data.holes);

  //create triangles in coords from array of indices
  let triangles = createTrianglesFromIndices(ind, geometry[0]);
  //console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
