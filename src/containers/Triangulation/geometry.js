import { Node } from './node';

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

export {
  area,
  signedArea,
  getLeftmost,
  locallyInside,
  pointInTriangle,
  splitPolygon
};
