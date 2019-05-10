import * as THREE from 'three';
import ConvertCoordinates from '../../components/Converter';

export default scene => {
  const material = new THREE.MeshBasicMaterial({ color: '#00F' });
  const holesMaterial = new THREE.MeshBasicMaterial({ color: '#FFF' });
  const linesMaterial = new THREE.MeshBasicMaterial({ color: '#00F' });
  const mapJson = require('../../readyMaps/Cairo/water.json');
  const mapJson1 = require('../../readyMaps/Cairo/houses.json');

  let objects = [];
  let holes = [];
  let lines = [];
  mapJson.items.forEach(feature => {
    const geom = new THREE.Geometry();
    feature.coordinates.forEach(coord => {
      coord = ConvertCoordinates(coord);
      geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
    });
    if (feature.fill === 'no') holes.push(geom);
    else if (feature.fill === 'yes') objects.push(geom);
    else lines.push(geom);
  });

  mapJson1.items.forEach(feature => {
    const geom = new THREE.Geometry();
    feature.coordinates.forEach(coord => {
      coord = ConvertCoordinates(coord);
      geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
    });
    if (feature.fill === 'no') holes.push(geom);
    else if (feature.fill === 'yes') objects.push(geom);
    else lines.push(geom);
  });

  let meshes = new THREE.Group();
  let holeMeshes = new THREE.Group();
  let lineMeshes = new THREE.Group();

  for (let i = 0; i < objects.length; i++) {
    const triangles = THREE.ShapeUtils.triangulateShape(
      objects[i].vertices,
      []
    );
    for (let j = 0; j < triangles.length; j++) {
      objects[i].faces.push(
        new THREE.Face3(triangles[j][0], triangles[j][1], triangles[j][2])
      );
    }
    const mesh = new THREE.Mesh(objects[i], material);
    meshes.add(mesh);
  }

  for (let i = 0; i < holes.length; i++) {
    const triangles1 = THREE.ShapeUtils.triangulateShape(holes[i].vertices, []);
    for (let j = 0; j < triangles1.length; j++) {
      holes[i].faces.push(
        new THREE.Face3(triangles1[j][0], triangles1[j][1], triangles1[j][2])
      );
    }
    const mesh1 = new THREE.Mesh(holes[i], holesMaterial);
    holeMeshes.add(mesh1);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = new THREE.Line(lines[i], linesMaterial);
    lineMeshes.add(line);
  }

  const group = new THREE.Group();
  // group.add(lineMeshes);
  group.add(meshes);
  group.add(holeMeshes);

  scene.add(group);
};
