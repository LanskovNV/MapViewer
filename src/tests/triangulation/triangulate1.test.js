import isCorrect from '../isCorrect';
import flattenCoords from '../../containers/Triangulation/flatten';
import { earcut } from '../../containers/Triangulation/triangulate';
import createTrianglesFromIndices from '../triangles';

test('triangulate 1', () => {
  const geometry = [
    [[100, 100], [100, 200], [150, 150], [200, 200], [200, 100]]
  ];
  const correctResults = [
    [
      [[100, 100], [100, 200], [150, 150]],
      [[100, 100], [150, 150], [200, 100]],
      [[200, 200], [150, 150], [200, 100]]
    ],
    [
      [[150, 150], [200, 200], [200, 100]],
      [[100, 100], [100, 200], [200, 100]]
    ],
    [[[100, 100], [200, 200], [200, 100]], [[100, 100], [100, 200], [150, 150]]]
  ];

  //get array of indices of vertices in triangles
  const data = flattenCoords(geometry);
  let ind = earcut(data.vertices, data.holes, data.dimensions);

  //create triangles in coords from array of indices
  let triangles = createTrianglesFromIndices(ind, geometry[0]);
  //console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
