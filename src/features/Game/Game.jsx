import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecord } from '../../store/LeaderboardSlice';

import Board from './components/Board/Board';
import Header from '../../widgets/header/header';

import './Game.scss';

const difficulties = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 32, mines: 100 },
};

const Game = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const difficulty = location.state?.difficulty || 'easy';
    const { rows, cols, mines } = difficulties[difficulty];

    const [board, setBoard] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing');
    const [flags, setFlags] = useState(0);
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [firstClick, setFirstClick] = useState(true);
    const [showWinModal, setShowWinModal] = useState(false);
    const [playerName, setPlayerName] = useState('');

    // Инициализация доски
    const initializeBoard = useCallback(() => {
        return Array(rows).fill().map(() =>
            Array(cols).fill().map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                isQuestion: false,
                neighborMines: 0,
            }))
        );
    }, [rows, cols]);

    // Перезапуск
    const resetGame = useCallback(() => {
        setBoard(initializeBoard());
        setGameStatus('playing');
        setFlags(0);
        setTime(0);
        setIsTimerRunning(false);
        setFirstClick(true);
        setShowWinModal(false);
        setPlayerName('');
    }, [initializeBoard]);

    // Положение мин
    const placeMines = useCallback((board, firstClickRow, firstClickCol) => {
        let minesPlaced = 0;
        const newBoard = JSON.parse(JSON.stringify(board));

        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);

            if ((row !== firstClickRow || col !== firstClickCol) && !newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Подсчет соседних мин
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!newBoard[row][col].isMine) {
                    let count = 0;
                    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
                        for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
                            if (newBoard[r][c].isMine) count++;
                        }
                    }
                    newBoard[row][col].neighborMines = count;
                }
            }
        }

        return newBoard;
    }, [mines, rows, cols]);

    // Раскрытие клетки
    const revealCell = (row, col) => {
        if (gameStatus !== 'playing' || board[row][col].isRevealed || board[row][col].isFlagged) {
            return;
        }

        let newBoard = [...board];

        if (firstClick) {
            newBoard = placeMines(newBoard, row, col);
            setIsTimerRunning(true);
            setFirstClick(false);
        }

        if (newBoard[row][col].isMine) {
            newBoard[row][col].isRevealed = true;
            setBoard(newBoard);
            setGameStatus('lost');
            setIsTimerRunning(false);
            revealAllMines();
            return;
        }

        newBoard[row][col].isRevealed = true;

        // Открытие ячейки если нет соседних мин
        if (newBoard[row][col].neighborMines === 0) {
            revealNeighbors(row, col, newBoard);
        }

        setBoard(newBoard);
        checkWinCondition(newBoard);
    };

    // Открытие всех мин при проигрыше
    const revealAllMines = () => {
        const newBoard = [...board];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (newBoard[row][col].isMine) {
                    newBoard[row][col].isRevealed = true;
                }
            }
        }
        setBoard(newBoard);
    };

    // Открытие соседних клеток
    const revealNeighbors = (row, col, board) => {
        for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
                if (!board[r][c].isRevealed && !board[r][c].isFlagged) {
                    board[r][c].isRevealed = true;
                    if (board[r][c].neighborMines === 0) {
                        revealNeighbors(r, c, board);
                    }
                }
            }
        }
    };

    // Флажок и вопросик
    const toggleFlag = (row, col, e) => {
        e.preventDefault();
        if (gameStatus !== 'playing' || board[row][col].isRevealed) {
            return;
        }

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (!cell.isFlagged && !cell.isQuestion) {
            cell.isFlagged = true;
            setFlags(flags + 1);
        } else if (cell.isFlagged) {
            cell.isFlagged = false;
            cell.isQuestion = true;
            setFlags(flags - 1);
        } else {
            cell.isQuestion = false;
        }

        setBoard(newBoard);
        checkWinCondition(newBoard);
    };

    // Условия выигрыша
    const checkWinCondition = (board) => {
        let allNonMinesRevealed = true;
        let allMinesFlagged = true;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = board[row][col];

                if (!cell.isMine && !cell.isRevealed) {
                    allNonMinesRevealed = false;
                }

                if (cell.isMine && !cell.isFlagged) {
                    allMinesFlagged = false;
                }
            }
        }

        if (allNonMinesRevealed || (allMinesFlagged && flags === mines)) {
            setGameStatus('won');
            setIsTimerRunning(false);
        }
    };

    // Таймер
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    useEffect(() => {
        if (gameStatus === 'won') {
            setShowWinModal(true);
        }
    }, [gameStatus]);

    // Сохранение результатов
    const saveResult = useCallback(() => {
        dispatch(addRecord({
            difficulty,
            time,
            name: playerName.trim() || 'Аноним'
        }));
        setShowWinModal(false);
        navigate('/leaderboard');
    }, [difficulty, time, playerName, dispatch, navigate]);

    useEffect(() => {
        resetGame();
    }, [difficulty, resetGame]);

    return (
        <div className="game">
            <Header
                time={time}
                minesLeft={mines - flags}
                onReset={resetGame}
                onBack={() => navigate('/')}
                gameStatus={gameStatus}
            />
            <Board
                board={board}
                onReveal={revealCell}
                onToggleFlag={toggleFlag}
                gameStatus={gameStatus}
            />

            {gameStatus === 'won' && !showWinModal && (
                <div className="game-over-message won">
                    <h2>Вы победили!</h2>
                    <p>Ваше время: {time} секунд</p>
                </div>
            )}

            {gameStatus === 'lost' && (
                <div className="game-over-message lost">
                    <h2>Игра окончена</h2>
                    <button onClick={resetGame}>Играть снова</button>
                </div>
            )}

            {showWinModal && (
                <div className="win-modal">
                    <div className="modal-content">
                        <h2>Поздравляем с победой! 🎉</h2>
                        <p>Ваше время: <strong>{time}</strong> секунд</p>

                        <div className="input-group">
                            <label htmlFor="playerName">Введите ваше имя:</label>
                            <input
                                id="playerName"
                                type="text"
                                placeholder="Игрок"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                maxLength="20"
                                autoFocus
                            />
                        </div>

                        <div className="modal-buttons">
                            <button
                                className="save-btn"
                                onClick={saveResult}
                                disabled={!playerName.trim()}
                            >
                                Сохранить результат
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowWinModal(false);
                                    resetGame();
                                }}
                            >
                                Не сохранять
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;