import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join('./src', 'locales'),
  autoReload: true,
  defaultLocale: 'en',
  headers: 'Accept-Language',
  queryParameter: 'lang',
});

export default i18n;
