import React from 'react';
import Cell from '../Cell/Cell';

import './Board.scss';

const Board = ({ board, onReveal, onToggleFlag, gameStatus }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            cell={cell}
                            onClick={() => onReveal(rowIndex, colIndex)}
                            onContextMenu={(e) => onToggleFlag(rowIndex, colIndex, e)}
                            gameStatus={gameStatus}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;