import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import earcutGetAll from '../../containers/Triangulation/getAll';

test('triangulate 12', () => {
  const geometry = [
    //polygon
    [[0, 0], [0, 80], [60, 80], [40, 40], [60, 20]]
  ];
  const incorrectResult = [
    [[0, 0], [0, 80], [40, 40]],
    [[0, 80], [40, 40], [60, 80]],
    [[40, 40], [60, 80], [60, 20]],
    [[0, 0], [40, 40], [60, 20]]
  ];

  //get array of indices of vertices in triangles
  let vertices = geometry[0];

  //add results of triangulation (in indices) here
  let ind = earcutGetAll(geometry);

  //create triangles in coords from array of indices
  let results = [];
  for (let i = 0; i < ind.length; i++) {
    results.push(createTrianglesFromIndices(ind[i], vertices));
  }
  //console.log(triangles);

  // check if the triangulation is correct comparing the preset correct result
  // with all triangulations given by algorithm
  expect(isCorrect(incorrectResult, results)).toEqual(false);
});
