import {
  PickHouses,
  PickStreets,
  PickWater
} from '../../containers/Parsing/DataFilter';
import data from '../data/data1';

test('filter houses', () => {
  let houses_correct = {
    items: [
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543243, -12.0033019],
                [-76.8543141, -12.0033425],
                [-76.8542611, -12.0033297],
                [-76.8542713, -12.0032891],
                [-76.8543243, -12.0033019]
              ]
            ]
          ]
        },
        properties: { building: 'yes' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.854326, -12.0032593],
                [-76.8543178, -12.0032958],
                [-76.8542856, -12.0032889],
                [-76.8542938, -12.0032524],
                [-76.854326, -12.0032593]
              ]
            ]
          ]
        },
        properties: { building: 'house' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543485, -12.0032822],
                [-76.8543337, -12.0033472],
                [-76.8543164, -12.0033434],
                [-76.8543312, -12.0032785],
                [-76.8543485, -12.0032822]
              ]
            ]
          ]
        },
        properties: { building: 'residential' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543434, -12.0033522],
                [-76.8543417, -12.0033593],
                [-76.8543267, -12.003356],
                [-76.8543283, -12.0033489],
                [-76.8543434, -12.0033522]
              ]
            ]
          ]
        },
        properties: { building: 'apartments' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8544621, -12.0031487],
                [-76.8544353, -12.0032563],
                [-76.8544033, -12.0032487],
                [-76.8544301, -12.0031411],
                [-76.8544621, -12.0031487]
              ]
            ]
          ]
        },
        properties: { building: 'industrial' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8544779, -12.0030946],
                [-76.8544641, -12.0031389],
                [-76.8544315, -12.0031292],
                [-76.8544453, -12.003085],
                [-76.8544779, -12.0030946]
              ]
            ]
          ]
        },
        properties: { building: 'commercial' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8545167, -12.0030366],
                [-76.8545043, -12.0030826],
                [-76.8544812, -12.0030766],
                [-76.8544936, -12.0030307],
                [-76.8545167, -12.0030366]
              ]
            ]
          ]
        },
        properties: { building: 'school' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8533426, -12.0036251],
                [-76.8533406, -12.0036636],
                [-76.8531948, -12.003642],
                [-76.8532018, -12.0035979],
                [-76.8532521, -12.0036041],
                [-76.8532511, -12.0036116],
                [-76.8533426, -12.0036251]
              ]
            ]
          ]
        },
        properties: { building: 'retail' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8522142, -12.0035325],
                [-76.8522131, -12.0035612],
                [-76.852186, -12.0035602],
                [-76.8521871, -12.0035315],
                [-76.8522142, -12.0035325]
              ]
            ]
          ]
        },
        properties: { building: 'church' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8530456, -12.00353],
                [-76.8530432, -12.0035459],
                [-76.8530114, -12.0035413],
                [-76.8530138, -12.0035254],
                [-76.8530456, -12.00353]
              ]
            ]
          ]
        },
        properties: { building: 'warehouse' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543243, -12.0033019],
                [-76.8543141, -12.0033425],
                [-76.8542611, -12.0033297],
                [-76.8542713, -12.0032891],
                [-78.8543243, -12.0033019]
              ]
            ]
          ]
        },
        properties: { building: 'service' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.854326, -12.0032593],
                [-76.8543178, -12.0032958],
                [-76.8542856, -12.0032889],
                [-75.8542938, -12.0032524],
                [-79.854326, -12.0032593]
              ]
            ]
          ]
        },
        properties: { building: 'university' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543485, -12.0032822],
                [-76.8543337, -12.0033472],
                [-76.8543164, -12.0033434],
                [-75.8543312, -12.0032785],
                [-71.8543485, -12.0032822]
              ]
            ]
          ]
        },
        properties: { building: 'public' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543434, -12.0033522],
                [-76.8543417, -12.0033593],
                [-76.8543267, -12.003356],
                [-76.8543283, -12.0033489],
                [-75.8543434, -12.0033522]
              ]
            ]
          ]
        },
        properties: { building: 'hospital' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8544621, -12.0031487],
                [-76.8544353, -12.0032563],
                [-76.8544033, -12.0032487],
                [-76.8544301, -11.0031411],
                [-74.8544621, -12.0031487]
              ]
            ]
          ]
        },
        properties: { building: 'hotel' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8544779, -12.0030946],
                [-76.8544641, -12.0031389],
                [-76.8544315, -12.0031292],
                [-76.8544453, -11.003085],
                [-72.8544779, -12.0030946]
              ]
            ]
          ]
        },
        properties: { building: 'dormitory' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8545167, -12.0030366],
                [-76.8545043, -12.0030826],
                [-76.8544812, -12.0030766],
                [-76.8544936, -12.0030307],
                [-73.8545167, -12.0030366]
              ]
            ]
          ]
        },
        properties: { building: 'college' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8545167, -12.0030366],
                [-76.8545043, -12.0030826],
                [-76.8544812, -12.0030766],
                [-76.8544936, -14.0030307],
                [-73.8545167, -11.0030366]
              ]
            ]
          ]
        },
        properties: { building: 'kindergarten' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8528629, -12.0030768],
                [-76.8528595, -12.0031405],
                [-76.8527462, -12.0031241],
                [-76.8527526, -14.0030578],
                [-76.8528629, -10.0030768]
              ]
            ]
          ]
        },
        properties: { building: 'service' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8545167, -12.0030366],
                [-76.8545043, -12.0030826],
                [-76.8544812, -12.0030766],
                [-76.8544936, -12.0030307],
                [-76.8545167, -12.0030366]
              ]
            ]
          ]
        },
        properties: { building: 'school' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-76.8543434, -12.0033522],
                [-76.8543417, -12.0033593],
                [-76.8543267, -12.003356],
                [-76.8543283, -12.0033489],
                [-75.8543434, -14.0033522]
              ]
            ]
          ]
        },
        properties: { building: 'hospital' }
      }
    ]
  };

  let streets_correct = { items: [] };
  let water_correct = { items: [] };

  let houses = PickHouses(data);
  let streets = PickStreets(data);
  let water = PickWater(data);

  expect(houses).toEqual(houses_correct);
  expect(streets).toEqual(streets_correct);
  expect(water).toEqual(water_correct);
});
