export default function objectGeneration(objects) {
  const elems = [];
  const houses = {
    id: 0,
    name: 'houses',
    toDraw: objects.isHouses,
    data: document.getElementById('housesProcFile'),
    color: '#520'
  };
  const streets = {
    id: 0,
    name: 'streets',
    toDraw: objects.isStreets,
    data: document.getElementById('streetsProcFile'),
    color: '#E90'
  };
  const water = {
    id: 0,
    name: 'water',
    toDraw: objects.isWater,
    data: document.getElementById('waterProcFile'),
    color: '#0AF'
  };
  elems.push(houses, streets, water);
  return elems;
}
