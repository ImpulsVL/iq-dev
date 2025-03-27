import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from './LeaderboardSlice';

export const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  },
});