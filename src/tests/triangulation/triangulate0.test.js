import { triangulate } from '../../containers/Triangulation/triangulation';
import isCorrect from '../isCorrect';

test('triangulate 0', () => {
  const geometry = [[100, 100], [100, 200], [200, 200], [200, 100]];
  const correctResults = [
    [
      [[100, 100], [100, 200], [200, 200]],
      [[100, 100], [200, 200], [200, 100]]
    ],
    [[[100, 200], [200, 200], [200, 100]], [[100, 100], [100, 200], [200, 100]]]
  ];

  //add the result of triangulation here
  let triangles = triangulate(geometry);
  console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
