import * as THREE from 'three';

export default function objectGeneration() {
  const elems = [];
  const houses = {
    id: 'houses',
    toDraw: true,
    data: document.getElementById('housesProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#520' })
  };
  const streets = {
    id: 'streets',
    toDraw: true,
    data: document.getElementById('streetsProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#E90' })
  };
  const water = {
    id: 'water',
    toDraw: true,
    data: document.getElementById('waterProcFile'),
    material: new THREE.MeshBasicMaterial({ color: '#0AF' })
  };
  elems.push(houses, streets, water);
  return elems;
}
