import React from 'react';
import './Form.scss';

type FormPropsType = {
  onSubmitForm: (e: React.FormEvent) => void;
};

export default function Form({ onSubmitForm }: FormPropsType) {
  return (
    <form className="form" onSubmit={onSubmitForm}>
      <input type="text" className="city-field" name="city" id="city" placeholder="City name..." />
      <button id="addBtn">Add</button>
    </form>
  );
}
