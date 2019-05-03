import * as THREE from 'three';

export default scene => {
  const holes = [];
  const geometry = new THREE.Geometry();
  const v1 = new THREE.Vector3(-2, -5, 0);
  const v2 = new THREE.Vector3(-4, 4, 0);
  const v3 = new THREE.Vector3(1, 1, 0);
  const v4 = new THREE.Vector3(2, 6, 0);
  const v5 = new THREE.Vector3(2, 3, 0);
  const v6 = new THREE.Vector3(6, -3, 0);

  geometry.vertices.push(v1);
  geometry.vertices.push(v2);
  geometry.vertices.push(v3);
  geometry.vertices.push(v4);
  geometry.vertices.push(v5);
  geometry.vertices.push(v6);
  const material = new THREE.MeshBasicMaterial();

  const triangles = THREE.ShapeUtils.triangulateShape(geometry.vertices, holes);

  for (let i = 0; i < triangles.length; i++) {
    geometry.faces.push(
      new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2])
    );
  }

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  /** code for drawing triangles
   *
  const group = new THREE.Group();

  const subjectGeometry1 = new THREE.Geometry();
  subjectGeometry1.vertices.push(new THREE.Vector3(-9, 0, 0));
  subjectGeometry1.vertices.push(new THREE.Vector3(0, 9, 0));
  subjectGeometry1.vertices.push(new THREE.Vector3(9, 0, 0));

  const subjectMaterial = new THREE.MeshBasicMaterial({
    color: '#00F',
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.5
  });

  const subjectMesh1 = new THREE.Mesh(subjectGeometry1, subjectMaterial);
  const line1 = new THREE.Line(subjectGeometry1, subjectMaterial);

  group.add(line1);
  group.add(subjectMesh1);
  scene.add(group);
  */
};
