/*
 *  Messages
 *
 * This contains all the text
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  home: {
    id: `home`,
    defaultMessage: 'Home'
  },
  map: {
    id: `map`,
    defaultMessage: 'Map'
  },
  licenseMessage: {
    id: `license.message`,
    defaultMessage: 'This project is licensed under the MIT license.'
  },
  authorMessage: {
    id: `author.message`,
    defaultMessage: `
      Made with love by {author}.`
  },
  Info: {
    id: `info`,
    defaultMessage: 'Map data:'
  },
  Flags: {
    id: `flags`,
    defaultMessage: 'Output:'
  },
  Streets: {
    id: `checkbox.streets`,
    defaultMessage: 'streets'
  },
  Houses: {
    id: `checkbox.houses`,
    defaultMessage: 'houses'
  },
  Water: {
    id: `checkbox.water`,
    defaultMessage: 'water objects'
  },
  Up: {
    id: `up`,
    defaultMessage: 'up'
  },
  Down: {
    id: `down`,
    defaultMessage: 'down'
  },
  Left: {
    id: `left`,
    defaultMessage: 'left'
  },
  Right: {
    id: `right`,
    defaultMessage: 'right'
  }
});
