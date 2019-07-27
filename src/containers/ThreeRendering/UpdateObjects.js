export default function updateObjects(objects) {
  objects.forEach(o => {
    o.data = document.getElementById(o.name + 'ProcFile');
  });
  return objects;
}
