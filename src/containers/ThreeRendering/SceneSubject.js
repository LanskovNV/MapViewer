import * as THREE from 'three';
import ConvertCoordinates from '../../components/Converter';

export default scene => {
  const material = new THREE.MeshBasicMaterial({ color: '#000' });
  const mapJson = require('../../readyMaps/test.json');

  let objects = [];
  mapJson.features.forEach(feature => {
    const geom = new THREE.Geometry();
    feature.geometry.coordinates.forEach(coord => {
      coord = ConvertCoordinates(coord);
      geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
    });
    objects.push(geom);
  });

  let holes = [];
  let meshes = new THREE.Group();
  for (let i = 0; i < objects.length; i++) {
    const triangles = THREE.ShapeUtils.triangulateShape(
      objects[i].vertices,
      holes
    );
    for (let j = 0; j < triangles.length; j++) {
      objects[i].faces.push(
        new THREE.Face3(triangles[j][0], triangles[j][1], triangles[j][2])
      );
    }
    const mesh = new THREE.Mesh(objects[i], material);
    meshes.add(mesh);
  }
  scene.add(meshes);
};
