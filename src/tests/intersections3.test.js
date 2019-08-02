const intersections = require('./intersections');

test('intersections of 2 triangles with a common border', () => {
  const vertices = [
    [200, 100],
    [100, 100],
    [100, 200],
    [200, 100],
    [300, 100],
    [300, 0]
  ];
  const triangles = [[0, 1, 2], [3, 4, 5]];

  expect(intersections(triangles, vertices)).toBe(false);
});
