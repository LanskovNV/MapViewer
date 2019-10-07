import { triangulate } from '../../containers/Triangulation/triangulation';
import isCorrect from './isCorrect';

test('triangulate 4', () => {
  const geometry = [
    [[0, 0], [0, 200], [50, 150], [100, 200], [100, 0], [50, 50], [0, 0]], //polygon
    [[50, 150], [100, 100], [50, 50], [0, 100], [50, 150]] //hole
  ];
  const correctResults = [
    [
      [[0, 0], [0, 100], [50, 50]],
      [[0, 100], [0, 200], [50, 150]],
      [[50, 150], [100, 200], [100, 100]],
      [[50, 50], [100, 100], [100, 0]]
    ]
  ];

  //add the result of triangulation here
  //add prep
  let triangles = []; //triangulate(geometry);
  //console.log(triangles);

  expect(isCorrect(triangles, correctResults)).toEqual(true);
});
