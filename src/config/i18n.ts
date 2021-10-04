import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
    // detect user language
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // format: (value, format, lng: any) => {
      //   if (value instanceof Date) {
      //     return format && DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format]);
      //   }
      //   return value;
      // },
    },
    // resources: {
    //   en: {
    //     translation: {
    //       buttons: {
    //         add: 'Add',
    //         remove: 'Remove all',
    //       },
    //     },
    //   },
    //   ru: {
    //     translation: {
    //       buttons: {
    //         add: 'Добавить',
    //         remove: 'Удалить все',
    //       },
    //     },
    //   },
    // },
  });

export default i18n;
