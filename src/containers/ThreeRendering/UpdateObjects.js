import updateToDrawFlags from './UpdateToDrawFlags';

export default function updateObjects(objects, toDraw) {
  objects.forEach(o => {
    o = updateToDrawFlags(o, toDraw);
    o.data = document.getElementById(o.name + 'ProcFile');
  });
  return objects;
}
