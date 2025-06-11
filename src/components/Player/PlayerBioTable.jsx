import React from "react";
import {useNavigate} from 'react-router-dom';

export const PlayerBioTable = ({players} ) => {
    const navigate = useNavigate();
    const handlePlayerClick = (player) => {
        navigate(`/players/${player.playerId}`, { state: { playerBio: player } });
    };

    return (
        <div className="player-stats-container">
            <table className="player-table">
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Full Name</th>
                        <th>Team Name</th>
                        <th>Position</th>
                        <th>Bat Side</th>
                        <th>Number</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.playerId} className="player-row" onClick={() => handlePlayerClick(player)}>
                            <td>{player.playerId}</td>
                            <td>{player.fullName} </td>
                            <td>{player.teamName}</td>
                            <td>{player.position}</td>
                            <td>{player.batSide}</td>
                            <td>{player.number}</td>
                            <td>{player.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}