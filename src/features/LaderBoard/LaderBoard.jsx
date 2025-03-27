import React from 'react';
import { useSelector } from 'react-redux';
import './LeaderBoard.scss';
import MainHeader from '../../widgets/mainHeader/MainHeader';

const Leaderboard = () => {
    const leaderboard = useSelector(state => state.leaderboard);

    return (
        <div className="leaderboard">
            <MainHeader />
            <h1 className='leaderboard__title'>Таблица лидеров</h1>

            <div className="difficulty__tables">
                <div className="difficulty__table">
                    <h2 className='table__title first'>Простой уровень</h2>
                    <table className='table'>
                        <thead>
                            <tr className='tr'>
                                <th className='th'>Место</th>
                                <th className='th'>Имя</th>
                                <th className='th'>Время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.easy.map((record, index) => (
                                <tr key={index} className='tr'>
                                    <td className='td'>{index + 1}</td>
                                    <td className='td'>{record.name || 'Аноним'}</td>
                                    <td className='td'>{record.time} сек</td>
                                </tr>
                            ))}
                            {leaderboard.easy.length === 0 && (
                                <tr className='tr'>
                                    <td colSpan="3" className='td'>Нет записей</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="difficulty__table">
                    <h2 className='table__title second'>Средний уровень</h2>
                    <table className='table'>
                        <thead>
                            <tr className='tr'>
                                <th className='th'>Место</th>
                                <th className='th'>Имя</th>
                                <th className='th'>Время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.medium.map((record, index) => (
                                <tr key={index} className='tr'>
                                    <td className='td'>{index + 1}</td>
                                    <td className='td'>{record.name || 'Аноним'}</td>
                                    <td className='td'>{record.time} сек</td>
                                </tr>
                            ))}
                            {leaderboard.medium.length === 0 && (
                                <tr className='tr'>
                                    <td colSpan="3" className='td'>Нет записей</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="difficulty__table">
                    <h2 className='table__title third'>Сложный уровень</h2>
                    <table className='table'>
                        <thead>
                            <tr className='tr'>
                                <th className='th'>Место</th>
                                <th className='th'>Имя</th>
                                <th className='th'>Время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.hard.map((record, index) => (
                                <tr key={index} className='tr'>
                                    <td className='td'>{index + 1}</td>
                                    <td className='td'>{record.name || 'Аноним'}</td>
                                    <td className='td'>{record.time} сек</td>
                                </tr>
                            ))}
                            {leaderboard.hard.length === 0 && (
                                <tr className='tr'>
                                    <td colSpan="3" className='td'>Нет записей</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;