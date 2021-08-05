import React from 'react';
import './SelectLanguage.scss';

export default function SelectLanguage() {
  return (
    <select name="language" id="lang" className="select-lang">
      <option value="EN">EN</option>
      <option value="RU">RU</option>
      <option value="UA">UA</option>
    </select>
  );
}
