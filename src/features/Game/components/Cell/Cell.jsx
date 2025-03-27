import React from 'react';

import Bomb from '../../../../shared/assets/bomb.svg';
import Flag from '../../../../shared/assets/flag.svg';

import './Cell.scss';

const Cell = ({ cell, onClick, onContextMenu, gameStatus }) => {
  const getCellContent = () => {
    if (!cell.isRevealed) {
      if (cell.isFlagged) return <img src={Flag} alt="Flag" className="flag-icon" />;
      if (cell.isQuestion) return '?';
      return '';
    }
    
    if (cell.isMine) return <img src={Bomb} alt="Mine" className="bomb-icon" />;
    if (cell.neighborMines > 0) return cell.neighborMines;
    return '';
  };

  const getCellClass = () => {
    let className = 'cell';
    
    if (cell.isRevealed) {
      className += ' revealed';
      if (cell.isMine) className += ' mine';
    } else {
      className += ' hidden';
    }
    
    if (cell.isRevealed && !cell.isMine && cell.neighborMines > 0) {
      className += ` number-${cell.neighborMines}`;
    }
    
    return className;
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;