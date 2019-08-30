import * as earcut from 'earcut';
import * as THREE from 'three';
import ConvertCoordinates from '../Parsing/Converter';

export default function draw(scene, data_json, object) {
  let polygons = [];
  let triangles = [];
  let lines = [];

  // parse json to objects
  data_json.items.forEach(feature => {
    const geom = new THREE.Geometry();

    if (feature.type === 'MultiPolygon') {
      const data = earcut.flatten(feature.coordinates[0]);
      const tr = earcut(data.vertices, data.holes, data.dimensions);
      triangles.push(tr);

      feature.coordinates[0].forEach(lineStr => {
        lineStr.forEach(coord => {
          coord = ConvertCoordinates(coord);
          geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
        });
      });
      polygons.push(geom);
    } else {
      feature.coordinates.forEach(coord => {
        coord = ConvertCoordinates(coord);
        geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
      });
      lines.push(geom);
    }
  });

  // multipolygon processing
  let meshes = new THREE.Group();

  for (let i = 0; i < polygons.length; i++) {
    polygons[i].faces = [];
    for (let j = 0; j < triangles[i].length - 2; j += 3) {
      polygons[i].faces.push(
        new THREE.Face3(
          triangles[i][j],
          triangles[i][j + 1],
          triangles[i][j + 2]
        )
      );
    }
    if (polygons[i].faces.length !== 0) {
      const mesh = new THREE.Mesh(
        polygons[i],
        new THREE.MeshBasicMaterial({ color: object.color })
      );
      meshes.add(mesh);
    }
  }

  // lines processing
  let lineMeshes = new THREE.Group();
  for (let i = 0; i < lines.length; i++) {
    const line = new THREE.Line(
      lines[i],
      new THREE.LineBasicMaterial({ color: object.color })
    );
    lineMeshes.add(line);
  }

  const group = new THREE.Group();
  group.add(lineMeshes);
  group.add(meshes);

  object.id = group.id;
  scene.add(group);
}
