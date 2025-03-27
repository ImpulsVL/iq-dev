import React from 'react';
import { Link } from 'react-router-dom';
import './StartGame.scss';

function StartGame() {
    return (
        <div className="selector">
            <h2 className='selector__title'>Сапёр</h2>
            <p className='selector__description'>Чтобы начать играть сделайте выбор режима</p>
            <div className="selector__options">
                <Link to="/game" state={{ difficulty: 'easy' }} className='button__easy'>
                    Простой (8x8, 10 мин)
                </Link>
                <Link to="/game" state={{ difficulty: 'medium' }} className='button__medium'>
                    Средний (16x16, 40 мин)
                </Link>
                <Link to="/game" state={{ difficulty: 'hard' }} className='button__hard'>
                    Сложный (32x16, 100 мин)
                </Link>
            </div>
        </div>
    );
};

export default StartGame;