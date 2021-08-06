import React from 'react';
import Form from '../Form/Form';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

import './Header.scss';

type HeaderPropsTYpe = {
  onSubmitForm: (e: React.FormEvent) => void;
  onSelectLang: (e: React.ChangeEvent) => void;
};

export default function Header({ onSubmitForm, onSelectLang }: HeaderPropsTYpe) {
  return (
    <header className="header">
      <Form onSubmitForm={onSubmitForm} />
      <SelectLanguage onSelectLang={onSelectLang} />
    </header>
  );
}
