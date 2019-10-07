import { triangulate } from '../../containers/Triangulation/triangulation';
import isCorrect from './isCorrect';

test('triangulate 3', () => {
  const geometry = [
    [50, 0],
    [50, 100],
    [100, 50],
    [150, 100],
    [150, 0],
    [100, 50],
    [50, 0]
  ];
  const correctResults = [
    [[[50, 0], [50, 100], [100, 50]], [[100, 50], [150, 100], [150, 0]]]
  ];

  //add the result of triangulation here
  //add prep?
  let triangles = triangulate(geometry);
  console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
