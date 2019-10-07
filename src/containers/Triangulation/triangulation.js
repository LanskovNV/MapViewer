/**
 * @return {boolean}
 */
function IsEqual(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}

/**
 * @return {number}
 */
function CrossProduct(v1, v2) {
  return v1[0] * v2[1] - v1[1] * v2[0];
}

/**
 * @return {boolean}
 */
function IsCrossed(m_point11, m_point12, m_point21, m_point22) {
  let k1, k2, b2, x0;
  let point11 = [m_point11[0], m_point11[1]],
    point12 = [m_point12[0], m_point12[1]],
    point21 = [m_point21[0], m_point21[1]],
    point22 = [m_point22[0], m_point22[1]];

  //Transform to coordinates' system with point11 as (0,0)
  // x-axis
  point12[0] -= point11[0];
  point21[0] -= point11[0];
  point22[0] -= point11[0];
  point11[0] -= point11[0];
  // y-axis
  point12[1] -= point11[1];
  point21[1] -= point11[1];
  point22[1] -= point11[1];
  point11[1] -= point11[1];

  if (point12[0] === point11[0] && point22[0] === point21[0]) {
    // Two vertical lines
    if (
      point11[0] === point21[0] &&
      ((point11[1] >= point21[1] && point11[1] <= point22[1]) ||
        (point11[1] >= point22[1] && point11[1] <= point21[1]) ||
        ((point12[1] >= point21[1] && point12[1] <= point22[1]) ||
          (point12[1] >= point22[1] && point12[1] <= point21[1])))
    ) {
      // Two vertical lines crossed
      //console.trace();
      return true;
    }
  } else if (point12[0] === point11[0]) {
    // First line is vertical
    let y0;
    k2 = (point22[1] - point21[1]) / (point22[0] - point21[0]);
    b2 = point21[1] - k2 * point21[0];
    x0 = point11[0];
    y0 = k2 * x0 + b2;
    if (
      ((y0 >= point11[1] && y0 <= point12[1]) ||
        (y0 >= point12[1] && y0 <= point11[1])) &&
      ((x0 >= point21[0] && x0 <= point22[0]) ||
        (x0 >= point22[0] && x0 <= point21[0])) &&
      (!IsEqual(point11, point21) &&
        !IsEqual(point11, point22) &&
        !IsEqual(point12, point21) &&
        !IsEqual(point12, point22))
    ) {
      //console.trace();
      return true;
    }
  } else if (point22[0] === point21[0]) {
    // Second line is vertical
    let y0;
    k1 = (point12[1] - point11[1]) / (point12[0] - point11[0]);
    x0 = point21[0];
    y0 = k1 * x0;
    if (
      ((y0 >= point21[1] && y0 <= point22[1]) ||
        (y0 >= point22[1] && y0 <= point21[1])) &&
      ((x0 >= point11[0] && x0 <= point12[0]) ||
        (x0 >= point12[0] && x0 <= point11[0])) &&
      (!IsEqual(point11, point21) &&
        !IsEqual(point11, point22) &&
        !IsEqual(point12, point21) &&
        !IsEqual(point12, point22))
    ) {
      //console.trace();
      return true;
    }
  } else {
    //
    k1 = (point12[1] - point11[1]) / (point12[0] - point11[0]);
    k2 = (point22[1] - point21[1]) / (point22[0] - point21[0]);
    b2 = point21[1] - k2 * point21[0];
    if (k1 === k2) {
      // Collinear segments
      return (
        b2 === 0 &&
        ((point11[0] >= point21[0] && point11[0] <= point22[0]) ||
          (point11[0] >= point22[0] && point11[0] <= point21[0]) ||
          ((point12[0] >= point21[0] && point12[0] <= point22[0]) ||
            (point12[0] >= point22[0] && point12[0] <= point21[0])))
      );
    }
    x0 = b2 / (k1 - k2);
    if (
      ((x0 >= point11[0] && x0 <= point12[0]) ||
        (x0 >= point12[0] && x0 <= point11[0])) &&
      ((x0 >= point21[0] && x0 <= point22[0]) ||
        (x0 >= point22[0] && x0 <= point21[0])) &&
      (!IsEqual(point11, point21) &&
        !IsEqual(point11, point22) &&
        !IsEqual(point12, point21) &&
        !IsEqual(point12, point22))
    ) {
      //console.trace();
      return true;
    }
  }
  return false;
}

/**
 * @return {boolean}
 */
function IsEar(pol, point1, point2, point3) {
  let middle = [(point1[0] + point3[0]) / 2, (point1[1] + point3[1]) / 2];
  for (let i = 1; i < pol.length; i++) {
    if (
      IsCrossed(pol[i - 1], pol[i], point1, point3) ||
      IsCrossed(pol[i - 1], pol[i], middle, point2)
    ) {
      return false;
    }
  }
  return true;
}

/**
 * @desc
 * @param {Array} pol - polygon to triangulate (without holes)
 * @returns {Array} triangles - resulting array of triangles
 */
function triangulate(pol) {
  let triangles = [];
  let i = 0,
    j = 0;

  //pol.pop();
  console.log(pol.length);
  while (pol.length > 3) {
    console.log('Step' + j++);
    console.log(pol.length);
    for (let i = 0; i < pol.length; i++) {
      console.log(pol[i]);
    }
    if (
      CrossProduct(
        [
          pol[(i + 1) % pol.length][0] - pol[i][0],
          pol[(i + 1) % pol.length][1] - pol[i][1]
        ],
        [
          pol[(i + 2) % pol.length][0] - pol[i][0],
          pol[(i + 2) % pol.length][1] - pol[i][1]
        ]
      ) < 0 &&
      IsEar(pol, pol[i], pol[(i + 1) % pol.length], pol[(i + 2) % pol.length])
    ) {
      triangles.push([
        pol[i],
        pol[(i + 1) % pol.length],
        pol[(i + 2) % pol.length]
      ]);
      console.log('Push triangle');
      console.log(pol[i], pol[(i + 1) % pol.length], pol[(i + 2) % pol.length]);
      if (i === pol.length - 1) {
        pol = pol.slice(1, pol.length);
        i--;
      } else if (i === pol.length - 2) {
        pol.pop();
      } else {
        pol = pol.slice(0, i + 1).concat(pol.slice(i + 2, pol.length));
      }
      // delete identical neighbors
      for (let i = 0; i < pol.length - 1; i++) {
        while (i < pol.length - 1 && IsEqual(pol[i], pol[i + 1])) {
          pol = pol.slice(0, i).concat(pol.slice(i + 1, pol.length));
        }
      }
      if (IsEqual(pol[0], pol[pol.length - 1])) {
        pol.pop();
      }
    } else {
      i = (i + 1) % pol.length;
    }
  }
  if (pol.length === 3) {
    triangles.push(pol);
  }
  console.log('End');
  return triangles;
}

export { triangulate, IsEqual, IsEar };
