import { removeNode } from './node';
import { equals, compareX } from './source';
import { linkedList } from './linkedList';
import {
  area,
  pointInTriangle,
  splitPolygon,
  locallyInside,
  getLeftmost
} from './geometry';
import { IsClockwise, IsCrossed, IsEqual, IsIdentical } from './triangulation';

// eliminate colinear or duplicate points
const filterPoints = (start, end) => {
  if (!start) return start;
  if (!end) end = start;

  let p = start,
    again;

  do {
    again = false;

    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) break;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);

  return end;
};

// David Eberly's algorithm for finding a bridge between hole and outer polygon
const findHoleBridge = (hole, outerNode) => {
  let p = outerNode,
    hx = hole.x,
    hy = hole.y,
    qx = -Infinity,
    m;

  // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point
  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      var x = p.x + ((hy - p.y) * (p.next.x - p.x)) / (p.next.y - p.y);
      if (x <= hx && x > qx) {
        qx = x;
        if (x === hx) {
          if (hy === p.y) return p;
          if (hy === p.next.y) return p.next;
        }
        m = p.x < p.next.x ? p : p.next;
      }
    }
    p = p.next;
  } while (p !== outerNode);

  if (!m) return null;

  if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point

  let stop = m,
    mx = m.x,
    my = m.y,
    tanMin = Infinity,
    tan;

  p = m.next;

  while (p !== stop) {
    if (
      hx >= p.x &&
      p.x >= mx &&
      hx !== p.x &&
      pointInTriangle(
        hy < my ? hx : qx,
        hy,
        mx,
        my,
        hy < my ? qx : hx,
        hy,
        p.x,
        p.y
      )
    ) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if (
        (tan < tanMin || (tan === tanMin && p.x > m.x)) &&
        locallyInside(p, hole)
      ) {
        m = p;
        tanMin = tan;
      }
    }

    p = p.next;
  }

  return m;
};

// find a bridge between vertices that connects hole with an outer ring and and link it
const eliminateHole = (hole, outerNode) => {
  outerNode = findHoleBridge(hole, outerNode);
  if (outerNode) {
    const b = splitPolygon(outerNode, hole);
    filterPoints(b, b.next);
  }
};

// link every hole into the outer loop, producing a single-ring polygon without holes
const eliminateHoles = (data, holeIndices, outerNode, dim) => {
  let queue = [],
    i,
    len,
    start,
    end,
    list;

  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }

  queue.sort(compareX);

  // process holes from left to right
  for (i = 0; i < queue.length; i++) {
    eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }

  return outerNode;
};

function polygonReorder(polygon, shouldBeClockWise) {
  let clockwise = false,
    polygon_reorder = [],
    left = 0;

  for (let i = 1; i < polygon.length; i++) {
    if (polygon[i][0] < polygon[left][0]) {
      left = i;
    }
  }

  if (
    IsClockwise(
      polygon[left],
      polygon[(left + 1) % polygon.length],
      polygon[(left + polygon.length - 1) % polygon.length]
    )
  ) {
    clockwise = true;
  }
  if (clockwise !== shouldBeClockWise) {
    for (let i = polygon.length - 1; i >= 0; i--) {
      polygon_reorder.push(polygon[i]);
    }
  } else {
    polygon_reorder = polygon;
  }
  return polygon_reorder;
}

const elimination = (data, holeIndices, dim) => {
  dim = dim || 2;

  let hasHoles = holeIndices && holeIndices.length,
    outerLen = hasHoles ? holeIndices[0] * dim : data.length,
    outerNode = linkedList(data, 0, outerLen, dim, true),
    triangles = [];

  if (!outerNode || outerNode.next === outerNode.prev) return triangles;

  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

  let p = outerNode;
  const polygon = [];

  do {
    const l = polygon.length;
    if (l === 0 || p.x !== polygon[l - 1][0] || p.y !== polygon[l - 1][1]) {
      polygon.push([p.x, p.y]);
    }
    p = p.next;
  } while (p !== outerNode);

  let polygon_reorder,
    left = 0,
    clockwise;

  /*console.log('Pre-reorder');
  for (let i = 0; i < polygon.length; i++) {
    console.log(polygon[i]);
  }*/

  polygon_reorder = polygonReorder(polygon, true);

  // delete identical neighbors
  for (let i = 0; i < polygon_reorder.length - 1; i++) {
    while (
      i < polygon_reorder.length - 1 &&
      IsEqual(polygon_reorder[i], polygon_reorder[i + 1])
    ) {
      polygon_reorder = polygon_reorder
        .slice(0, i)
        .concat(polygon_reorder.slice(i + 1, polygon_reorder.length));
    }
  }
  if (
    IsEqual(polygon_reorder[0], polygon_reorder[polygon_reorder.length - 1])
  ) {
    polygon_reorder.pop();
  }
  /*console.log('Post-reorder');
  for (let i = 0; i < polygon_reorder.length; i++) {
    console.log(polygon_reorder[i]);
  }*/
  return polygon_reorder;
};

/**
 * @return {boolean}
 */
function CheckHole(point1, point2, hole) {
  let check1 = false,
    check2 = false;
  for (let i = 0; i < hole.length; i++) {
    if (IsEqual(point1, hole[i])) {
      check1 = true;
    }
    if (IsEqual(point2, hole[i])) {
      check2 = true;
    }
  }
  return check1 && check2;
}

function eliminateHole2(polygon) {
  let res_polygon = [],
    res_polygon0 = [],
    isBridged = false,
    isCrossed = false;

  for (let i = 0; i < polygon[1].length; i++) {
    if (isBridged) {
      break;
    }
    for (let j = 0; j < polygon[0].length; j++) {
      isCrossed = false;
      for (let t = 0; t < polygon.length; t++) {
        if (isCrossed) {
          break;
        }
        for (let k = 1; k <= polygon[t].length; k++) {
          if (
            (!IsEqual(polygon[0][j], polygon[1][i]) &&
              IsCrossed(
                polygon[t][k - 1],
                polygon[t][k % polygon[t].length],
                polygon[0][j],
                polygon[1][i]
              ) &&
              !IsIdentical(
                [polygon[t][k - 1], polygon[t][k % polygon[t].length]],
                [polygon[0][j], polygon[1][i]]
              )) ||
            (CheckHole(polygon[0][j], polygon[1][i], polygon[1]) &&
              !IsEqual(polygon[0][j], polygon[1][i]))
          ) {
            isCrossed = true;
            break;
          }
        }
      }
      if (!isCrossed) {
        for (let l = 0; l <= j; l++) {
          res_polygon0.push(polygon[0][l]);
        }
        for (let l = i; l < polygon[1].length; l++) {
          res_polygon0.push(polygon[1][l]);
        }
        for (let l = 0; l <= i; l++) {
          res_polygon0.push(polygon[1][l]);
        }
        for (let l = j; l < polygon[0].length; l++) {
          res_polygon0.push(polygon[0][l]);
        }

        isBridged = true;
        break;
      }
    }
  }
  if (isBridged) {
    res_polygon.push(res_polygon0);
    for (let i = 2; i < polygon.length; i++) {
      res_polygon.push(polygon[i]);
    }
  } else {
    res_polygon = polygon
      .slice(0, 1)
      .concat(polygon.slice(2, polygon.length))
      .concat(polygon.slice(1, 2));
  }

  return res_polygon;
}

function elimination2(polygon) {
  let res_polygon;

  for (let i = 0; i < polygon.length; i++) {
    polygon[i].pop();
  }

  polygon[0] = polygonReorder(polygon[0], true);
  while (polygon.length > 1) {
    polygon[1] = polygonReorder(polygon[1], false);
    polygon = eliminateHole2(polygon);
  }

  res_polygon = polygon[0];

  /*console.log('Post-reorder');
    for (let i = 0; i < res_polygon.length; i++) {
        console.log(res_polygon[i]);
    }*/

  // delete identical neighbors
  for (let i = 0; i < res_polygon.length - 1; i++) {
    while (
      i < res_polygon.length - 1 &&
      IsEqual(res_polygon[i], res_polygon[i + 1])
    ) {
      res_polygon = res_polygon
        .slice(0, i)
        .concat(res_polygon.slice(i + 1, res_polygon.length));
    }
  }
  if (IsEqual(res_polygon[0], res_polygon[res_polygon.length - 1])) {
    res_polygon.pop();
  }
  /*console.log('Post-reorder');
    for (let i = 0; i < res_polygon.length; i++) {
        console.log(res_polygon[i]);
    }*/
  return res_polygon;
}

export default elimination2;
