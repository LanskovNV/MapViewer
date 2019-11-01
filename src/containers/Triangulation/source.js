// source function for sort
const compareX = (a, b) => {
  return a.x - b.x;
};

// check if two points are equal
const equals = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

export { equals, compareX };
