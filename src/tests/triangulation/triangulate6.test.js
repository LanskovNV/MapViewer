import { earcut } from '../../containers/Triangulation/triangulate';
import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import flattenCoords from '../../containers/Triangulation/flatten';

test('triangulate 6', () => {
  //triangle with a triangle hole
  const geometry = [
    //polygon
    [[0, 0], [100, 90], [200, 0]],
    //hole
    [[50, 30], [100, 60], [150, 30]]
  ];
  const correctResults = [
    [
      [[0, 0], [50, 30], [100, 90]],
      [[50, 30], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [150, 30]],
      [[150, 30], [100, 90], [200, 0]],
      [[0, 0], [50, 30], [150, 30]],
      [[0, 0], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 60]],
      [[0, 0], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [150, 30]],
      [[150, 30], [100, 90], [200, 0]],
      [[0, 0], [50, 30], [150, 30]],
      [[0, 0], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 90]],
      [[50, 30], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [200, 0]],
      [[150, 30], [100, 60], [200, 0]],
      [[0, 0], [50, 30], [150, 30]],
      [[0, 0], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 60]],
      [[0, 0], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [200, 0]],
      [[150, 30], [100, 60], [200, 0]],
      [[0, 0], [50, 30], [150, 30]],
      [[0, 0], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 90]],
      [[50, 30], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [150, 30]],
      [[150, 30], [100, 90], [200, 0]],
      [[0, 0], [50, 30], [200, 0]],
      [[50, 30], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 60]],
      [[0, 0], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [150, 30]],
      [[150, 30], [100, 90], [200, 0]],
      [[0, 0], [50, 30], [200, 0]],
      [[50, 30], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 90]],
      [[50, 30], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [200, 0]],
      [[150, 30], [100, 60], [200, 0]],
      [[0, 0], [50, 30], [200, 0]],
      [[50, 30], [150, 30], [200, 0]]
    ],
    [
      [[0, 0], [50, 30], [100, 60]],
      [[0, 0], [100, 90], [100, 60]],
      [[100, 60], [100, 90], [200, 0]],
      [[150, 30], [100, 60], [200, 0]],
      [[0, 0], [50, 30], [200, 0]],
      [[50, 30], [150, 30], [200, 0]]
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
