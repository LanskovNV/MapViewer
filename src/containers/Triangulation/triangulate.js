import { linkedList } from './linkedList';
import { eliminateHoles } from './preprocessing';
import { Node, removeNode } from './node';
import { filterPoints } from './preprocessing';
import { area } from './geometry';
import { equals } from './source';

export function earcut(data, holeIndices, dim) {
  dim = dim || 2;

  var hasHoles = holeIndices && holeIndices.length,
    outerLen = hasHoles ? holeIndices[0] * dim : data.length,
    outerNode = linkedList(data, 0, outerLen, dim, true),
    triangles = [];

  if (!outerNode || outerNode.next === outerNode.prev) return triangles;

  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

  earcutLinked(outerNode, triangles, dim);

  return triangles;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, pass) {
  if (!ear) return;

  // interlink polygon nodes in z-order
  // if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

  var stop = ear,
    prev,
    next;

  // iterate through ears, slicing them one by one
  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;

    if (isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);

      removeNode(ear);

      // skipping the next vertex leads to less sliver triangles
      ear = next.next;
      stop = next.next;

      continue;
    }

    ear = next;

    // if we looped through the whole remaining polygon and can't find any more ears
    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, 1);

        // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(ear, triangles, dim);
        earcutLinked(ear, triangles, dim, 2);

        // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim);
      }

      break;
    }
  }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
  var a = ear.prev,
    b = ear,
    c = ear.next;

  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

  // now make sure we don't have other points inside the potential ear
  var p = ear.next.next;

  while (p !== ear.prev) {
    if (
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0
    )
      return false;
    p = p.next;
  }

  return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
  var p = start;
  do {
    var a = p.prev,
      b = p.next.next;

    if (
      !equals(a, b) &&
      intersects(a, p, p.next, b) &&
      locallyInside(a, b) &&
      locallyInside(b, a)
    ) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim);

      // remove two nodes involved
      removeNode(p);
      removeNode(p.next);

      p = start = b;
    }
    p = p.next;
  } while (p !== start);

  return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim) {
  // look for a valid diagonal that divides the polygon into two
  var a = start;
  do {
    var b = a.next.next;
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        var c = splitPolygon(a, b);

        // filter colinear points around the cuts
        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next);

        // run earcut on each half
        earcutLinked(a, triangles, dim);
        earcutLinked(c, triangles, dim);
        return;
      }
      b = b.next;
    }
    a = a.next;
  } while (a !== start);
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (
    (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
    (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
    (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
  );
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
  return (
    a.next.i !== b.i &&
    a.prev.i !== b.i &&
    !intersectsPolygon(a, b) &&
    locallyInside(a, b) &&
    locallyInside(b, a) &&
    middleInside(a, b)
  );
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
  if ((equals(p1, q1) && equals(p2, q2)) || (equals(p1, q2) && equals(p2, q1)))
    return true;
  return (
    area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
    area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0
  );
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
  var p = a;
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
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0
    ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0
    : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
  var p = a,
    inside = false,
    px = (a.x + b.x) / 2,
    py = (a.y + b.y) / 2;
  do {
    if (
      p.y > py !== p.next.y > py &&
      p.next.y !== p.y &&
      px < ((p.next.x - p.x) * (py - p.y)) / (p.next.y - p.y) + p.x
    )
      inside = !inside;
    p = p.next;
  } while (p !== a);

  return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
  var a2 = new Node(a.i, a.x, a.y),
    b2 = new Node(b.i, b.x, b.y),
    an = a.next,
    bp = b.prev;

  a.next = b;
  b.prev = a;

  a2.next = an;
  an.prev = a2;

  b2.next = a2;
  a2.prev = b2;

  bp.next = b2;
  b2.prev = bp;

  return b2;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
export function flatten(data) {
  var dim = data[0][0].length,
    result = { vertices: [], holes: [], dimensions: dim },
    holeIndex = 0;

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
    }
    if (i > 0) {
      holeIndex += data[i - 1].length;
      result.holes.push(holeIndex);
    }
  }
  return result;
}
