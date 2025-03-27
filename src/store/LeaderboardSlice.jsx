import { createSlice } from '@reduxjs/toolkit';

const loadLeaderboardFromLocalStorage = () => {
  const saved = localStorage.getItem('minesweeper-leaderboard');
  return saved ? JSON.parse(saved) : { easy: [], medium: [], hard: [] };
};

const initialState = loadLeaderboardFromLocalStorage();

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addRecord: (state, action) => {
      const { difficulty, time, name } = action.payload;
      const newRecord = { name, time };
      
      state[difficulty] = [...state[difficulty], newRecord]
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
      
      localStorage.setItem('minesweeper-leaderboard', JSON.stringify(state));
    },
  },
});

export const { addRecord } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;