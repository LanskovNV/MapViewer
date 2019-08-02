import * as THREE from 'three';
import ConvertCoordinates from '../Parsing/Converter';
import { statusJSON } from '../Parsing/Handle';

export default (scene, objects) => {
  const holesMaterial = new THREE.MeshBasicMaterial({ color: '#FFF' });
  const elems = [];

  const houses = {
    toDraw: objects.isHouses,
    data: document.getElementById('housesProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#520' })
  };
  const streets = {
    toDraw: objects.isStreets,
    data: document.getElementById('streetsProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#E90' })
  };
  const water = {
    toDraw: objects.isWater,
    data: document.getElementById('waterProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#0AF' })
  };
  elems.push(houses, streets, water);

  elems.forEach(object => {
    if (object.toDraw) {
      fetch(object.data)
        .then(statusJSON)
        .then(data => draw(data, object));
    }
  });

  function draw(data_json, object) {
    let polygons = [];
    let holes = [];
    let lines = [];

    data_json.items.forEach(feature => {
      const geom = new THREE.Geometry();
      feature.coordinates.forEach(coord => {
        coord = ConvertCoordinates(coord);
        geom.vertices.push(new THREE.Vector3(coord[0], coord[1], 0));
      });
      if (feature.fill === 'no') holes.push(geom);
      else if (feature.fill === 'yes') polygons.push(geom);
      else lines.push(geom);
    });

    let meshes = new THREE.Group();
    let holeMeshes = new THREE.Group();
    let lineMeshes = new THREE.Group();

    for (let i = 0; i < lines.length; i++) {
      const line = new THREE.Line(lines[i], object.material);
      lineMeshes.add(line);
    }

    for (let i = 0; i < polygons.length; i++) {
      const triangles = THREE.ShapeUtils.triangulateShape(
        polygons[i].vertices,
        []
      );
      for (let j = 0; j < triangles.length; j++) {
        polygons[i].faces.push(
          new THREE.Face3(triangles[j][0], triangles[j][1], triangles[j][2])
        );
      }
      const mesh = new THREE.Mesh(polygons[i], object.material);
      meshes.add(mesh);
    }

    for (let i = 0; i < holes.length; i++) {
      const triangles1 = THREE.ShapeUtils.triangulateShape(
        holes[i].vertices,
        []
      );
      for (let j = 0; j < triangles1.length; j++) {
        holes[i].faces.push(
          new THREE.Face3(triangles1[j][0], triangles1[j][1], triangles1[j][2])
        );
      }
      const mesh1 = new THREE.Mesh(holes[i], holesMaterial);
      holeMeshes.add(mesh1);
    }

    const group = new THREE.Group();
    group.add(lineMeshes);
    group.add(meshes);
    group.add(holeMeshes);

    scene.add(group);
  }
};