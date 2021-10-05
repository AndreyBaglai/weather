import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'weather/locales/{{lng}}/{{ns}}.json'
    },
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
  });

export default i18n;
