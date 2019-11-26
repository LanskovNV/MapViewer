//import earcut from '../../containers/Triangulation/triangulate';
import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import flattenCoords from '../../containers/Triangulation/flatten';

test('triangulate 9', () => {
  const geometry = [
    //polygon
    [[0, 0], [0, 50], [30, 20], [50, 50], [70, 20], [100, 50], [100, 0]]
  ];
  const correctResult = [
    [[0, 0], [0, 50], [30, 20]],
    [[30, 20], [50, 50], [70, 20]],
    [[70, 20], [100, 50], [100, 0]],
    [[30, 20], [70, 20], [100, 0]],
    [[0, 0], [30, 20], [100, 0]]
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
