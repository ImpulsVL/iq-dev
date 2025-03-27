import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainGame from './features/MainGame/MainGame';

import { Provider } from 'react-redux';
import { store } from './store/store';
import Game from './features/Game/Game';
import Leaderboard from './features/LaderBoard/LaderBoard';

function App() {
  return (
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Routes>

            <Route path="/" element={<MainGame />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="*" element={<MainGame />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
