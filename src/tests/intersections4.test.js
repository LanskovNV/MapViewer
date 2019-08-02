const intersections = require('./intersections');

test('intersections of 2 triangles one inside another', () => {
  const vertices = [[0, 0], [0, 100], [100, 0], [0, 200], [200, 0]];
  const triangles = [[0, 1, 2], [3, 4, 0]];

  expect(intersections(triangles, vertices)).toBe(true);
});
