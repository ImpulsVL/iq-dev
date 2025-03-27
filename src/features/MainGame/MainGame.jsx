import React from 'react';
import './MainGame.scss';

import StartGame from './components/StarGame/StartGame';
import MainHeader from '../../widgets/mainHeader/MainHeader';

function MainGame() {
    return (
        <div className='wrapper'>
            <MainHeader />
            <StartGame />
        </div>
    );
}

export default MainGame;