import { triangulate } from '../../containers/Triangulation/triangulation';
import isCorrect from '../isCorrect';

test('triangulate 1', () => {
  const geometry = [[100, 100], [100, 200], [150, 150], [200, 200], [200, 100]];
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

  //add the result of triangulation here
  let triangles = triangulate(geometry);
  console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
