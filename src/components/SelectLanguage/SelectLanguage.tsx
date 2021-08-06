import React from 'react';
import { getLangFromLS } from '../../services/localStorage';

import './SelectLanguage.scss';

type SelectLanguagePropsType = {
  onSelectLang: (e: React.ChangeEvent) => void;
};

export default function SelectLanguage({ onSelectLang }: SelectLanguagePropsType) {
  return (
    <select name="language" id="lang" className="select-lang" onChange={onSelectLang} defaultValue={getLangFromLS()}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
      <option value="uk">UA</option>
    </select>
  );
}
