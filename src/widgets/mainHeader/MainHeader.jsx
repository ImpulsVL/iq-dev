import React from 'react';
import './MainHeader.scss';

import { Link } from 'react-router-dom';

function MainHeader() {
    return (
        <header className='mainHeader'>
            <Link
                to={`/`}
                className='link__main'>
                Главная страница
            </Link>
            <Link
                to={`/leaderboard`}
                className='link__laderboard'>
                Таблица лидеров
            </Link>
        </header>
    );
}

export default MainHeader;