import React from 'react';
import { observer } from 'mobx-react-lite';

import { getLangFromLS, setLangToLS } from '../../services/localStorage';
import languageStore from '../../store/language';

import './SelectLanguage.scss';

const SelectLanguage = observer(() => {
  const onSelectLang = (e: React.ChangeEvent) => {
    const target = e.target as HTMLOptionElement;
    const selectedLang = target.value;

    languageStore.changeLang(selectedLang);
    setLangToLS(selectedLang);
  };

  return (
    <select
      name="language"
      id="lang"
      className="select-lang"
      onChange={onSelectLang}
      defaultValue={getLangFromLS()}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
      <option value="uk">UA</option>
    </select>
  );
});

export default SelectLanguage;
