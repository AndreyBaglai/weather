import React from 'react';
import Form from '../Form/Form';
import SelectLanguage from '../SelectLanguage/SelectLanguage';
import './Header.scss';

export default function Header() {
  return <header className="header">
    <Form />
    <SelectLanguage />
  </header>;
}
