import React from 'react';
import { Link } from 'react-router-dom';
import Bomb from '../../shared/assets/bomb.svg';

import './header.scss';

const Header = ({ time, minesLeft, onReset, gameStatus }) => {

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-header">
      <div className="timer">{formatTime(time)}</div>
      <div className="mines-counter"><img src={Bomb} alt="Mine" className="bomb-icon" /> {minesLeft}</div>
      <button 
        className="reset-button"
        onClick={onReset}
      >
        Перезапуск
      </button>
      <Link 
        className="back-button"
        to={'/'}
      >
        Настройки
      </Link>
    </div>
  );
};

export default Header;