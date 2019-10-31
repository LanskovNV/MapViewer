import { earcut } from '../../containers/Triangulation/triangulate';
import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import flattenCoords from '../../containers/Triangulation/flatten';

test('triangulate 5', () => {
  const geometry = [
    //polygon
    [[0, 0], [0, 200], [50, 150], [100, 200], [100, 100], [100, 0], [50, 50]],
    //hole
    [[50, 150], [100, 100], [50, 50], [0, 100]]
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
  let ind = earcut(data.vertices, data.holes, data.dimensions);

  //create triangles in coords from array of indices
  let vertices = geometry[0].concat(geometry[1]);
  let triangles = createTrianglesFromIndices(ind, vertices);
  //console.log(triangles);

  //check if the triangulation is correct comparing the result with correct triangulations
  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
