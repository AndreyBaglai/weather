import React, { useEffect, useState } from 'react';
import uniqId from 'uniqid';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

import { useStore } from 'stores';
import { CardModel } from 'types/Card';

import { getWeatherByCity } from 'services/weather-api';
import { setCardsToLS } from 'services/localStorage';

import styles from './styles.module.scss';

interface IInputs {
  city: string;
}

const Form: React.FC = () => {
  const [isNotFound, setIsNotFound] = useState(false);
  const [isRepeatCity, setIsRepeatCity] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IInputs>();
  const { cardsStore, languageStore } = useStore();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ city: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitForm = async ({ city }: IInputs) => {
    try {
      if (city === '') return;

      const response = await getWeatherByCity(city, languageStore.lang);
    
      if (!response) {
        setIsNotFound(true);
        setTimeout(() => setIsNotFound(false), 2000);
      }

      const card: CardModel = {
        id: uniqId(),
        city: response.name,
        time: response.dt,
        country: response.sys.country,
        temperature: response.main.temp,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        feels: response.main.feels_like,
        icon: response.weather[0].icon,
        text_icon: response.weather[0].main,
        description: response.weather[0].description,
        wind_speed: response.wind.speed,
        isCelsius: true,
      };

      if (cardsStore.isRepeatCard(card)) {
        setTimeout(() => setIsRepeatCity(false), 2000);
        setIsRepeatCity(true);
      }

      cardsStore.addCard(card);
      setCardsToLS(cardsStore.cards);
    } catch (err) {
      console.log(`Invalid city name ${err}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
      <input
        type="text"
        className={styles.cityField}
        id="city"
        placeholder={t('placeholder')}
        {...register('city', {
          pattern: {
            value: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Zа-яА-Я\u0080-\u024F]*$/,
            message: t('tooltips.validate'),
          },
        })}
      />
      {errors.city && <p className={styles.error}>{errors.city.message}</p>}
      {isNotFound && <p className={styles.error}>{t('tooltips.not_found')}</p>}
      {isRepeatCity && <p className={styles.error}>{t('tooltips.city_repeat')}</p>}
      <Button classBtn={styles.addBtn} id="addBtn">
        {t('buttons.add')}
      </Button>
    </form>
  );
};

export default Form;
