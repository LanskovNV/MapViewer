const intersections = require('./intersections');

test('intersections of 2 triangles with a common border', () => {
  const vertices = [[100, 100], [100, 200], [200, 200], [200, 100]];
  const triangles = [[0, 1, 2], [0, 1, 3]];

  expect(intersections(triangles, vertices)).toBe(true);
});
