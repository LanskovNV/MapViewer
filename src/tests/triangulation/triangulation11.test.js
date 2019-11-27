import isCorrect from '../isCorrect';
import createTrianglesFromIndices from '../triangles';
import earcutGetAll from '../../containers/Triangulation/getAll';

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
    [[0, 40], [10, 70], [50, 0]],
    [[10, 70], [30, 70], [50, 50]],
    [[50, 0], [10, 70], [50, 50]],
    [[50, 50], [70, 70], [90, 70]],
    [[50, 0], [50, 50], [90, 70]],
    [[50, 0], [90, 70], [100, 40]]
  ];

  //get array of indices of vertices in triangles
  let vertices = geometry[0];

  //add results of triangulation (in indices) here
  let ind = earcutGetAll(geometry);

  //create triangles in coords from array of indices
  let results = [];
  for (let i = 0; i < ind.length; i++) {
    let trs = createTrianglesFromIndices(ind[i], vertices);
    results.push(trs);
    //console.log(trs);
  }

  // check if the triangulation is correct comparing the preset correct result
  // with all triangulations given by algorithm
  expect(isCorrect(correctResult, results)).toEqual(true);
});
