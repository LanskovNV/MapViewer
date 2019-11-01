import { Node } from './node';
import { equals } from './source';

// signed area of a triangle
const area = (p, q, r) => {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
};

// check if a point lies within a convex triangle
const pointInTriangle = (ax, ay, bx, by, cx, cy, px, py) => {
  return (
    (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
    (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
    (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
  );
};

// check if a polygon diagonal is locally inside the polygon
const locallyInside = (a, b) => {
  return area(a.prev, a, a.next) < 0
    ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0
    : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
};

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
const splitPolygon = (a, b) => {
  const a2 = new Node(a.i, a.x, a.y);
  const b2 = new Node(b.i, b.x, b.y);
  const an = a.next;
  const bp = b.prev;

  a.next = b;
  b.prev = a;

  a2.next = an;
  an.prev = a2;

  b2.next = a2;
  a2.prev = b2;

  bp.next = b2;
  b2.prev = bp;

  return b2;
};

const signedArea = (data, start, end, dim) => {
  let sum = 0;

  for (let i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }

  return sum;
};

// find the leftmost node of a polygon ring
const getLeftmost = start => {
  let p = start;
  let leftmost = start;

  do {
    if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y))
      leftmost = p;
    p = p.next;
  } while (p !== start);

  return leftmost;
};

const middleInside = (a, b) => {
  let p = a,
    inside = false,
    px = (a.x + b.x) / 2,
    py = (a.y + b.y) / 2;
  do {
    const a1 = p.y > py;
    const b1 = p.next.y > py;
    if (
      a1 !== b1 &&
      p.next.y !== p.y &&
      px < ((p.next.x - p.x) * (py - p.y)) / (p.next.y - p.y) + p.x
    )
      inside = !inside;
    p = p.next;
  } while (p !== a);

  return inside;
};

const intersects = (p1, q1, p2, q2) => {
  if ((equals(p1, q1) && equals(p2, q2)) || (equals(p1, q2) && equals(p2, q1)))
    return true;
  const a = area(p1, q1, p2) > 0;
  const b = area(p1, q1, q2) > 0;
  const c = area(p2, q2, p1) > 0;
  const d = area(p2, q2, q1) > 0;
  return a !== b && c !== d;
};

const intersectsPolygon = (a, b) => {
  let p = a;
  do {
    if (
      p.i !== a.i &&
      p.next.i !== a.i &&
      p.i !== b.i &&
      p.next.i !== b.i &&
      intersects(p, p.next, a, b)
    )
      return true;
    p = p.next;
  } while (p !== a);

  return false;
};

const isValidDiagonal = (a, b) => {
  return (
    a.next.i !== b.i &&
    a.prev.i !== b.i &&
    !intersectsPolygon(a, b) &&
    locallyInside(a, b) &&
    locallyInside(b, a) &&
    middleInside(a, b)
  );
};

export {
  intersects,
  isValidDiagonal,
  middleInside,
  area,
  signedArea,
  getLeftmost,
  locallyInside,
  pointInTriangle,
  splitPolygon
};
