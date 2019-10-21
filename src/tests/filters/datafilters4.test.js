import {
  PickHouses,
  PickStreets,
  PickWater
} from '../../containers/Parsing/DataFilter';
import data from '../data/data4';

test('filter the amount of extraneous data', () => {
  let water_correct = { items: [] };
  let streets_correct = { items: [] };
  let houses_correct = { items: [] };

  let water = PickWater(data);
  let streets = PickStreets(data);
  let houses = PickHouses(data);

  expect(water).toEqual(water_correct);
  expect(streets).toEqual(streets_correct);
  expect(houses).toEqual(houses_correct);
});
