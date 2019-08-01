import * as THREE from 'three';

export default function objectGeneration(objects) {
  const elems = [];
  const houses = {
    id: 0,
    name: 'houses',
    toDraw: objects.isHouses,
    data: document.getElementById('housesProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#520' })
  };
  const streets = {
    id: 0,
    name: 'streets',
    toDraw: objects.isStreets,
    data: document.getElementById('streetsProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#E90' })
  };
  const water = {
    id: 0,
    name: 'water',
    toDraw: objects.isWater,
    data: document.getElementById('waterProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#0AF' })
  };
  elems.push(houses, streets, water);
  return elems;
}
