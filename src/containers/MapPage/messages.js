/*
 * MapPage Messages
 *
 * This contains all the text for the MapPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'mapviewer.containers.MapPage';

export default defineMessages({
  Info: {
    id: `${scope}.info`,
    defaultMessage: 'Map data:'
  },
  Flags: {
    id: `${scope}.flags`,
    defaultMessage: 'Output:'
  },
  Streets: {
    id: `${scope}.checkbox.streets`,
    defaultMessage: 'streets'
  },
  Houses: {
    id: `${scope}.checkbox.houses`,
    defaultMessage: 'houses'
  },
  Water: {
    id: `${scope}.checkbox.water`,
    defaultMessage: 'water objects'
  },
  Up: {
    id: `${scope}.up`,
    defaultMessage: 'up'
  },
  Down: {
    id: `${scope}.down`,
    defaultMessage: 'down'
  },
  Left: {
    id: `${scope}.left`,
    defaultMessage: 'left'
  },
  Right: {
    id: `${scope}.right`,
    defaultMessage: 'right'
  }
});
