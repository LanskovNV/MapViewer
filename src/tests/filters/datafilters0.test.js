import {
  PickHouses,
  PickStreets,
  PickWater
} from '../../containers/Parsing/DataFilter';
import data from '../data/data0';

test('filter points', () => {
  let streets_correct = {
    items: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.0260108, -11.9203196],
            [-77.0256104, -11.9200032],
            [-77.0255162, -11.9199288],
            [-77.0251039, -11.9196118],
            [-77.0248447, -11.9193983]
          ]
        },
        properties: { name: 'Object1', highway: 'residential' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.0255241, -11.9185317],
            [-77.0257744, -11.9187293],
            [-77.0262057, -11.9190615]
          ]
        },
        properties: { name: 'Object3', highway: 'residential' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.0222368, -11.9222834],
            [-77.0221124, -11.9220632],
            [-77.02207, -11.9219882]
          ]
        },
        properties: { name: 'Object4', highway: 'residential' }
      }
    ]
  };

  let houses_correct = {
    items: [
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-77.0769538, -11.994326],
                [-77.0768752, -11.9948045],
                [-77.076446, -11.9947446],
                [-77.0765072, -11.9946467],
                [-77.0765777, -11.9945028],
                [-77.0765564, -11.9943373],
                [-77.0764717, -11.9942526],
                [-77.0764359, -11.9942363],
                [-77.0764432, -11.9941669],
                [-77.0768734, -11.9942338],
                [-77.0768771, -11.9942753],
                [-77.076908, -11.9943184],
                [-77.0769538, -11.994326]
              ]
            ]
          ]
        },
        properties: { name: 'Object6', shop: 'convenience', building: 'yes' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-77.0439395, -12.1144422],
                [-77.0437741, -12.1146121],
                [-77.0436164, -12.1147739],
                [-77.0434881, -12.1146485],
                [-77.0436481, -12.1144875],
                [-77.0438122, -12.1143223],
                [-77.0439395, -12.1144422]
              ]
            ]
          ]
        },
        properties: { building: 'yes' }
      }
    ]
  };

  let water_correct = { items: [] };

  let streets = PickStreets(data);
  let houses = PickHouses(data);
  let water = PickWater(data);

  expect(streets).toEqual(streets_correct);
  expect(houses).toEqual(houses_correct);
  expect(water).toEqual(water_correct);
});
