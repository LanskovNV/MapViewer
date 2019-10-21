import {
  PickHouses,
  PickStreets,
  PickWater
} from '../../containers/Parsing/DataFilter';
import data from '../data/data2';

test('filter streets', () => {
  let streets_correct = {
    items: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-77.0212902, -12.1385657], [-77.0213427, -12.1380514]]
        },
        properties: {
          name: 'Highway2',
          lanes: '2',
          highway: 'residential',
          surface: 'concrete'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.0204275, -12.1385075],
            [-77.0204698, -12.1380369],
            [-77.0204951, -12.137822]
          ]
        },
        properties: {
          name: 'Highway3',
          highway: 'service',
          surface: 'concrete'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.01879, -12.1407422],
            [-77.0187722, -12.1407922],
            [-77.0185295, -12.1414753]
          ]
        },
        properties: { name: 'Highway4', highway: 'footway', surface: 'asphalt' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-77.0212902, -12.1385657], [-77.0213427, -12.1380514]]
        },
        properties: {
          name: 'Highway5',
          lanes: '2',
          highway: 'residential',
          surface: 'concrete'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-77.0212902, -12.1385657], [-77.0213427, -12.1380514]]
        },
        properties: {
          name: 'Highway17',
          lanes: '2',
          highway: 'residential',
          surface: 'concrete'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-77.01879, -12.1407422],
            [-77.0187722, -12.1407922],
            [-77.0185295, -12.1414753]
          ]
        },
        properties: {
          name: 'Highway19',
          highway: 'footway',
          surface: 'asphalt'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-77.0212902, -12.1385657], [-77.0213427, -12.1380514]]
        },
        properties: {
          name: 'Highway35',
          lanes: '2',
          highway: 'residential',
          surface: 'concrete'
        }
      }
    ]
  };

  let houses_correct = { items: [] };
  let water_correct = { items: [] };

  let streets = PickStreets(data);
  let houses = PickHouses(data);
  let water = PickWater(data);

  expect(streets).toEqual(streets_correct);
  expect(houses).toEqual(houses_correct);
  expect(water).toEqual(water_correct);
});
