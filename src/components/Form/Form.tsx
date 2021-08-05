import React from 'react';
import './Form.scss';

export default function Form() {
  return (
    <form className="form">
      <input type="text" className="city-field" placeholder="City name..." />
      <button id="addBtn">Add</button>
    </form>
  );
}
