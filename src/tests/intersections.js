function intersections(triangles, grid) {
  for (let i = 0; i < triangles.length - 1; i++) {
    for (let j = i + 1; j < triangles.length; j++) {
      if (areIntersectTriangles(triangles[i], triangles[j], grid)) {
        return true;
      }
    }
  }
  return false;
}

function areIntersectTriangles(triangle1, triangle2, grid) {
  let tr1 = [grid[triangle1[0]], grid[triangle1[1]], grid[triangle1[2]]];
  let tr2 = [grid[triangle2[0]], grid[triangle2[1]], grid[triangle2[2]]];
  let bnd1 = getBounders(tr1);
  let bnd2 = getBounders(tr2);

  for (let i = 0; i < 3; i++) {
    //check if current triangle 1 border is a dividing line
    if (isDividingLine(tr1[(i + 2) % 3], bnd1[i], tr2)) return false;

    //check if current triangle 2 border is a dividing line
    if (isDividingLine(tr2[(i + 2) % 3], bnd2[i], tr1)) {
      return false;
    }
  }
  return true;
}

function getBounders(triangle) {
  let k1 = 0,
    k2 = 0,
    k3 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0;

  if (triangle[1][0] !== triangle[0][0]) {
    k1 = (triangle[1][1] - triangle[0][1]) / (triangle[1][0] - triangle[0][0]);
    b1 = triangle[0][1] - triangle[0][0] * k1;
  } else c1 = triangle[1][0];

  if (triangle[2][0] !== triangle[1][0]) {
    k2 = (triangle[2][1] - triangle[1][1]) / (triangle[2][0] - triangle[1][0]);
    b2 = triangle[1][1] - triangle[1][0] * k2;
  } else c2 = triangle[2][0];

  if (triangle[0][0] !== triangle[2][0]) {
    k3 = (triangle[0][1] - triangle[2][1]) / (triangle[0][0] - triangle[2][0]);
    b3 = triangle[2][1] - triangle[2][0] * k3;
  } else c3 = triangle[0][0];

  return [[k1, b1, c1], [k2, b2, c2], [k3, b3, c3]];
}

//check if a line divide the vertex from another triangle
function isDividingLine(vertex, line, triangle) {
  if (isHigherThanLine(vertex, line)) {
    if (
      !isHigherThanLine(triangle[0], line) &&
      !isHigherThanLine(triangle[1], line) &&
      !isHigherThanLine(triangle[2], line)
    ) {
      return true;
    }
  }
  if (isLowerThanLine(vertex, line)) {
    if (
      !isLowerThanLine(triangle[0], line) &&
      !isLowerThanLine(triangle[1], line) &&
      !isLowerThanLine(triangle[2], line)
    ) {
      return true;
    }
  }
  return false;
}

//lineParams {k, b, c}: if c = 0, line equation is y = kx + b else x = c
function isHigherThanLine(point, lineParams) {
  if (
    (lineParams[2] !== 0 && point[0] > lineParams[2]) ||
    (lineParams[2] === 0 && point[1] > lineParams[0] * point[0] + lineParams[1])
  ) {
    return true;
  }
  return false;
}

function isLowerThanLine(point, lineParams) {
  if (
    (lineParams[2] !== 0 && point[0] < lineParams[2]) ||
    (lineParams[2] === 0 && point[1] < lineParams[0] * point[0] + lineParams[1])
  ) {
    return true;
  }
  return false;
}

module.exports = intersections;
