import React, {useEffect, useState} from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Link } from 'react-router-dom';
import TeamSelectBox from "./TeamSelectBox";
import PlayerSelectBox from "./Player/PlayerSelectBox";
import fetchPlayers from "../lib/fetchPlayers";
import fetchBatterDailyStats from "../lib/fetchBatterDailyStats";

const HomeNav = () => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            console.log(`Submit button clicked. Handling the request for ${selectedPlayer}, ${selectedTeam} .`)
            setError(null);
            setIsLoading(true);
            const data = await fetchPlayers(selectedTeam, selectedPlayer)
            setResultData(data)
            console.log('data===',data)
        } catch (err) {
            setError(err.message);
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadDefault = async () => {
            console.log('loading default data')
            setIsLoading(true);
            setError(null);
            try {
                const players = await fetchPlayers();
                setResultData(players)
            } catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }

        };
        loadDefault();
    }, []);

    return (
        <ErrorBoundary>
            <div className="select-player-containerr">
                <h1>MLB Player Statistics</h1>
                <div className="select-player-box">
                    <TeamSelectBox
                        onTeamSelect={(value) => setSelectedTeam(value)}
                    />
                </div>
                <div className="select-player-box">
                    <PlayerSelectBox
                        teamId={selectedTeam}
                        onPlayerSelect={(value) => setSelectedPlayer(value)}
                    />
                </div>
                    <button
                        className="App-button"
                        disabled={!selectedTeam && !selectedPlayer}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Loading...' : 'Search Players'}
                    </button>

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        Error: {error}
                    </div>
                )}

                {isLoading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading player data...</p>
                    </div>
                )}

                {resultData && (
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
                                    <th>MLB Debut Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultData.map((player) => (
                                        <tr key={player.playerId} className="player-row">
                                            <td>{player.playerId}</td>
                                            <td>
                                                <Link
                                                    to={`/players/${player.playerId}`}
                                                    className="player-link"
                                                >
                                                    {player.fullName}
                                                </Link>
                                            </td>
                                            <td>{player.teamName}</td>
                                            <td>{player.position}</td>
                                            <td>{player.batSide}</td>
                                            <td>{player.number}</td>
                                            <td>{player.age}</td>
                                            <td>{new Date(player.mlbDebutDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                               }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </ErrorBoundary>
    );
};

export default HomeNav;