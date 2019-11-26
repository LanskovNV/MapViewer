//import earcut from '../../containers/Triangulation/triangulate';
import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import flattenCoords from '../../containers/Triangulation/flatten';

test('triangulate 11', () => {
  const geometry = [
    //polygon
    [
      [0, 40],
      [10, 70],
      [30, 70],
      [50, 50],
      [70, 70],
      [90, 70],
      [100, 40],
      [50, 0]
    ]
  ];
  const correctResult = [
    [[0, 40], [10, 70], [30, 70]],
    [[0, 40], [30, 70], [50, 50]],
    [[0, 40], [50, 50], [50, 0]],
    [[50, 0], [50, 50], [70, 70]],
    [[50, 0], [70, 70], [100, 40]],
    [[70, 70], [90, 70], [100, 40]]
  ];

  //get array of indices of vertices in triangles
  const data = flattenCoords(geometry);
  let vertices = geometry[0];

  //TO DO: add results of triangulation (in indices) here
  let ind = []; //= earcutGetAll(data.vertices, data.holes);

  //create triangles in coords from array of indices
  let results = [];
  for (let i = 0; i < ind.length; i++) {
    results.add(createTrianglesFromIndices(ind[i], vertices));
  }
  //console.log(triangles);

  // check if the triangulation is correct comparing the preset correct result
  // with all triangulations given by algorithm
  expect(isCorrect(correctResult, results)).toEqual(true);
});
