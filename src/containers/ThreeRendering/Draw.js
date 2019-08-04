import * as THREE from 'three';
import ConvertCoordinates from '../Parsing/Converter';

export default function draw(scene, data_json, object) {
  let polygons = [];
  let lines = [];

  // parse json to objects
  data_json.items.forEach(feature => {
    const vertices = [];

    if (feature.type === 'MultiPolygon') {
      // polygon's vertices
      feature.coordinates[0].forEach(coord => {
        coord = ConvertCoordinates(coord);
        vertices.push(new THREE.Vector2(coord[0], coord[1]));
      });

      const shape = new THREE.Shape(vertices);

      // holes vertices
      if (feature.coordinates.length !== 1) {
        feature.coordinates[1].forEach(hole => {
          const holePoints = [];
          const newHole = new THREE.Path();

          hole.forEach(coord1 => {
            coord1 = ConvertCoordinates(coord1);
            holePoints.push(new THREE.Vector3(coord1[0], coord1[1], 0));
          });

          newHole.fromPoints(holePoints);
          shape.holes.push(newHole);
        });
      }
      polygons.push(shape);

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
  for (let i = 0; i < polygons.length; i++) {
    const points = polygons[i].extractPoints(3);
    const triangles = THREE.ShapeUtils.triangulateShape(
      points.vertices,
      points.holes
    );
    const polygon = new THREE.Geometry();
    polygon.faces = [];
    triangles.forEach(tr => {
      polygon.faces.push(new THREE.Face3(tr[0], tr[1], tr[2]));
    });
    meshes.add(new THREE.Mesh(polygon, object.material));
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
