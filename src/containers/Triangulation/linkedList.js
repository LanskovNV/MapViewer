import { equals } from './source';
import { signedArea } from './geometry';
import { insertNode, removeNode } from './node';

// create a circular doubly linked list from polygon points in the specified winding order
const linkedList = (data, start, end, dim, clockwise) => {
  let i, last;

  if ((clockwise === signedArea(data, start, end, dim)) > 0) {
    for (i = start; i < end; i += dim)
      last = insertNode(i, data[i], data[i + 1], last);
  } else {
    for (i = end - dim; i >= start; i -= dim)
      last = insertNode(i, data[i], data[i + 1], last);
  }

  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }

  return last;
};

export { linkedList };
