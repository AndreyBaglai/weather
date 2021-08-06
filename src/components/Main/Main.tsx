import React from 'react';
import Card from '../Card/Card';
import './Main.scss';

type MainPropsType = {
  onChangeTemperature: (e: React.MouseEvent) => void;
};

export default function Main({ onChangeTemperature }: MainPropsType) {
  return (
    <main className="main">
      <Card onChangeTemperature={onChangeTemperature} />
      {/* <Card /> */}
      {/* <Card /> */}
    </main>
  );
}
