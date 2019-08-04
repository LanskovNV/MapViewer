import * as THREE from 'three';
import ConvertCoordinates from '../Parsing/Converter';

export default function draw(scene, data_json, object) {
  let polygons = [];
  let polyShapes = [];
  let lines = [];

  // parse json to objects
  data_json.items.forEach(feature => {
    const vertices = [];

    if (feature.type === 'MultiPolygon') {
      // polygon's vertices
      feature.coordinates[0].forEach(lineStr => {
        lineStr.forEach(coord => {
          coord = ConvertCoordinates(coord);
          vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
        });
      });

      const polygon = new THREE.Geometry();
      polygon.vertices = vertices;
      const shape = new THREE.Shape(polygon.vertices);

      // holes vertices
      for (let i = 1; i < feature.coordinates.length; i++) {
        const holePoints = [];

        feature.coordinates[i].forEach(lineStr1 => {
          lineStr1.forEach(coord1 => {
            coord1 = ConvertCoordinates(coord1);
            holePoints.push(new THREE.Vector3(coord1[0], coord1[1], 0));
          });
        });

        //polygon.vertices = polygon.vertices.concat(holePoints);
        const newHole = new THREE.Path();
        newHole.fromPoints(holePoints);
        shape.holes.push(newHole);
      }
      polyShapes.push(shape);
      polygons.push(polygon);

      // lines
    } else {
      const geom = new THREE.Geometry();
      feature.coordinates.forEach(coord => {
        coord = ConvertCoordinates(coord);
        geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
      });
      lines.push(geom);
    }
  });

  // multipolygon processing
  let meshes = new THREE.Group();
  for (let i = 0; i < polyShapes.length; i++) {
    const points = polyShapes[i].extractPoints(2);
    const triangles = THREE.ShapeUtils.triangulateShape(
      points.shape,
      points.holes
    );
    polygons[i].faces = [];
    triangles.forEach(tr => {
      polygons[i].faces.push(new THREE.Face3(tr[0], tr[1], tr[2]));
    });
    polygons[i].computeFaceNormals();
    polygons[i].computeVertexNormals();
    const mesh = new THREE.Mesh(polygons[i], object.material);
    meshes.add(mesh);
  }

  // lines processing
  let lineMeshes = new THREE.Group();
  for (let i = 0; i < lines.length; i++) {
    const line = new THREE.Line(lines[i], object.material);
    lineMeshes.add(line);
  }

  const group = new THREE.Group();
  group.add(lineMeshes);
  group.add(meshes);

  object.id = group.id;
  scene.add(group);
}
