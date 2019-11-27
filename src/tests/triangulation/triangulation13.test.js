import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import earcutGetAll from '../../containers/Triangulation/getAll';

test('triangulate 13', () => {
  const geometry = [
    //polygon
    [[0, 0], [0, 80], [20, 50], [60, 60], [70, 0], [40, 30], [10, 20]]
  ];
  const correctResult = [
    [[0, 0], [0, 80], [10, 20]],
    [[10, 20], [0, 80], [20, 50]],
    [[10, 20], [20, 50], [40, 30]],
    [[20, 50], [40, 30], [60, 60]],
    [[40, 30], [60, 60], [70, 0]]
  ];

  //get array of indices of vertices in triangles
  let vertices = geometry[0];

  //add results of triangulation (in indices) here
  let ind = earcutGetAll(geometry);
  //console.log(ind);

  //create triangles in coords from array of indices
  let results = [];
  for (let i = 0; i < ind.length; i++) {
    results.push(createTrianglesFromIndices(ind[i], vertices));
  }

  // check if the triangulation is correct comparing the preset correct result
  // with all triangulations given by algorithm
  //
  expect(isCorrect(correctResult, results)).toEqual(true);
});
