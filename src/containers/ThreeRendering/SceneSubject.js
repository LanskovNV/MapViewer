import * as THREE from 'three';

export default scene => {
  const group = new THREE.Group();

  const subjectGeometry = new THREE.Geometry();
  subjectGeometry.vertices.push(new THREE.Vector3(-9, 0, 0));
  subjectGeometry.vertices.push(new THREE.Vector3(0, 9, 0));
  subjectGeometry.vertices.push(new THREE.Vector3(9, 0, 0));
  subjectGeometry.vertices.push(new THREE.Vector3(0, -9, 0));
  subjectGeometry.vertices.push(new THREE.Vector3(-9, 0, 0));

  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: '#f00',
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

  const line = new THREE.Line(subjectGeometry, subjectMaterial);

  group.add(line);
  group.add(subjectMesh);
  scene.add(group);
};
