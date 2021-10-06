import React from 'react';
import { observer } from 'mobx-react-lite';
import uniqId from 'uniqid';
import { useTranslation } from 'react-i18next';

import { useStore } from 'stores';

import { CardModel } from 'types/Card';
import { ILanguages } from 'types/Languages';
import { IResponseWeather, IWeatherEntity } from 'types/ResponseWeather';

import { getLangFromLS, setCardsToLS, setLangToLS } from 'services/localStorage';
import { getWeatherByCity } from 'services/weather-api';

import styles from './styles.module.scss';

const langs: ILanguages = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
  uk: { nativeName: 'Ukraine' },
  he: { nativeName: 'Hebrew' },
};

const SelectLanguage: React.FC = observer(() => {
  const { cardsStore, languageStore, loaderStore } = useStore();
  const { i18n } = useTranslation();

  const onSelectLang = async (event: React.ChangeEvent) => {
    loaderStore.toggleLoader();
    
    const target = event.target as HTMLOptionElement;
    const selectedLang = target.value;
    i18n.changeLanguage(selectedLang);

    const cityNames = cardsStore.getAllNamesCity();
    
    const preparedRequests: Promise<IResponseWeather>[] = cityNames.map(
      (city: string) =>
        new Promise((resolve, _) => {
          resolve(getWeatherByCity(city, selectedLang));
        }),
    );

    const newCards = await Promise.all(preparedRequests).then((response) =>
      response.map((item: IResponseWeather) => {
        const weatherInfo = item.weather && item.weather[0];
        const card: CardModel = {
          id: uniqId(),
          city: item.name,
          time: item.dt,
          country: item.sys.country,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          feels: item.main.feels_like,
          icon: weatherInfo && weatherInfo.icon,
          text_icon: weatherInfo && weatherInfo.main,
          description: weatherInfo && weatherInfo.description,
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
      {Object.keys(langs).map((lang: string) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
});

export default SelectLanguage;
