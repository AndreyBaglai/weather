import React from 'react';
import Form from '../Form/Form';
import SelectLanguage from '../SelectLanguage/SelectLanguage';
import './Header.scss';

type HeaderPropsTYpe = {
  onSubmitForm: (e: React.FormEvent) => {};
};

export default function Header({ onSubmitForm }: HeaderPropsTYpe) {
  return (
    <header className="header">
      <Form onSubmitForm={onSubmitForm} />
      <SelectLanguage />
    </header>
  );
}
