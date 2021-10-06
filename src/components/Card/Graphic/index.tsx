import React from 'react'

import { ReactComponent as GraphicIcon } from 'sources/icons/graphic.svg';

import styles from './styles.module.scss';

interface IProps {
  temperature: number;
}

const Graphic: React.FC<IProps> = ({ temperature }) => {
  return (
    <div className={styles.graphic}>
    <ul className={styles.tempList}>
        <li>10</li>
        <li>13</li>
        <li>16</li>
        <li>13</li>
        <li>10</li>
        <li>10</li>
        <li>07</li>
      </ul>

      <GraphicIcon className={temperature > 0 ? styles.redGraphic : styles.blueGraphic}/>

      <ul className={styles.week}>
        <li>19.04</li>
        <li>20.04</li>
        <li>21.04</li>
        <li>22.04</li>
        <li>23.04</li>
        <li>24.04</li>
        <li>25.04</li>
      </ul>
    </div>
  )
}

export default Graphic;