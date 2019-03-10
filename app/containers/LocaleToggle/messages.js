/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'mapviewer.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'en',
  },
  de: {
    id: `${scope}.ru`,
    defaultMessage: 'ru',
  },
});
