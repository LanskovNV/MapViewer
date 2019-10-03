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

  return polygon;
};

export default elimination;
