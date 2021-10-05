import React from 'react';
import { observer } from 'mobx-react-lite';
import uniqId from 'uniqid';
import { useTranslation } from 'react-i18next';

import { getLangFromLS, setCardsToLS, setLangToLS } from '../../services/localStorage';
import languageStore from '../../stores/Language';
import cardsStore from '../../stores/Cards';
import loaderStore from '../../stores/Loader';
import { getWeatherByCity } from '../../services/weather-api';
import { CardModel } from '../../types/card-model';

import styles from './styles.module.scss';

const langs: any = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
  uk: { nativeName: 'Ukraine' },
  he: { nativeName: 'Hebrew' },
};

const SelectLanguage: React.FC = observer(() => {
  const { i18n } = useTranslation(); 

  const onSelectLang = async (e: React.ChangeEvent) => {
    loaderStore.toggleLoader();
    const target = e.target as HTMLOptionElement;
    const selectedLang = target.value;
    i18n.changeLanguage(selectedLang);
    
    const cityNames = cardsStore.getAllNamesCity();
    const preparedRequests = cityNames.map(
      (city: string) =>
        new Promise((resolve, _) => {
          resolve(getWeatherByCity(city, selectedLang));
        }),
    );

    const newCards = await Promise.all(preparedRequests).then((response) =>
      response.map((item: any) => {
        const card: CardModel = {
          id: uniqId(),
          city: item.name,
          time: item.dt,
          country: item.sys.country,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          feels: item.main.feels_like,
          icon: item.weather[0].icon,
          text_icon: item.weather[0].main,
          description: item.weather[0].description,
          wind_speed: item.wind.speed,
          isCelsius: true,
        };

        return card;
      }),
    );

    cardsStore.updateCards(newCards);
    languageStore.changeLang(selectedLang);

    setCardsToLS(newCards);
    setLangToLS(selectedLang);

    setTimeout(() => {
      loaderStore.toggleLoader();
    }, 1000);
  };

  return (
    <select
      name="language"
      id="lang"
      className={styles.selectLang}
      onChange={onSelectLang}
      defaultValue={getLangFromLS()}>
      {Object.keys(langs).map((lang: any) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
});

export default SelectLanguage;
