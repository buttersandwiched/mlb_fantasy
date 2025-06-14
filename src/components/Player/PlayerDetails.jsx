import React, { useState, useEffect } from 'react';
import fetchBatterSeasonStats  from "../../lib/fetchBatterSeasonStats";
import fetchBatterDailyStats from "../../lib/fetchBatterDailyStats";
import fetchPitcherDailyStats from "../../lib/fetchPitcherDailyStats";
import { useLocation } from 'react-router-dom';
import {PlayerBioCard} from "./PlayerBioCard";
import logo from '../../app/logo2.png'
import '../../app/App.css'
import fetchPitcherSeasonStats from "../../lib/fetchPitcherSeasonStats";


const PlayerDetails = () => {
    const location = useLocation();
    const { playerBio } = location.state || {}; // ✅ Retrieve passed data
    const [playerDailyStats, setPlayerDailyStats] = useState([]);
    const [playerSeasonStats, setPlayerSeasonStats] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [seasonStatsIsLoading, setSeasonStatsIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // load player daily stats data from the database, filtered by playerId
        const loadDailyStats = async () => {
            setIsLoading(true);
            try {
                const data = playerBio.position === 'P'
                    ? await fetchPitcherDailyStats(playerBio.playerId)
                    : await fetchBatterDailyStats(playerBio.playerId)
                setPlayerDailyStats(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (playerBio) loadDailyStats();
    }, [playerBio]);

    useEffect(() => {
        // load player daily stats data from the database, filtered by playerId
        const loadSeasonStats = async () => {
            setSeasonStatsIsLoading(true)
            try {
                const data = playerBio.position === 'P'
                    ? await fetchPitcherSeasonStats(playerBio.playerId)
                    : await fetchBatterSeasonStats(playerBio.playerId)
                setPlayerSeasonStats(data)
                } catch (err) {
                    setError(err.message);
                } finally {
                    setSeasonStatsIsLoading(false);
                }
            };
        loadSeasonStats();
    }, [playerBio]);

    if (error) {
        return (
            <div className="error-message"> <span className="error-icon">⚠️</span> Error: {error} </div>
        );
    }

    if (isLoading || seasonStatsIsLoading) {
        return (
                <div className="loading-container">
                    <div className="spinner"></div>
                        <p>Loading player statistics...</p>
                </div>
        );
    }
    return  playerSeasonStats.length > 0 &&(
            <div className="player-info-grid">
                <div className="player-header">
                    <img src={logo} alt="..." style={{ width: '100px', height: 'auto' }} />
                    <h1>{playerBio.fullName}</h1>
                </div>
                <PlayerBioCard player={playerBio}/>
                <div className="info-group">
                    <h2>Season Stats</h2>
                    {playerBio.position === 'P' ?
                        <div className="info-content">
                            <div className="info-item">
                                    <span className="label"> Games </span>
                                    <span className="value"> {playerSeasonStats[0].games} </span>

                            </div>
                            <div className="info-item">
                                    <span className="label"> ERA </span>
                                    <span className="value"> {playerSeasonStats[0].ERA} </span>
                            </div>
                              <div className="info-item">
                                    <span className="label"> Opponent BA </span>
                                    <span className="value"> {playerSeasonStats[0].opponentBA} </span>
                            </div>
                            <div className="info-item">
                                    <span className="label"> Strikeouts </span>
                                    <span className="value"> {playerSeasonStats[0].strikeouts} </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Walks:</span>
                                <span className="value">{playerSeasonStats[0].walks} </span>
                            </div>
                        </div>
                        :
                        <div className="info-content">
                            <div className="info-item">
                                    <span className="label"> Batting Avg </span>
                                    <span className="value"> {playerSeasonStats[0].battingAverage} </span>
                            </div>
                                <div className="info-item">
                                    <span className="label">HR:</span>
                                    <span className="value">{playerSeasonStats[0].homeruns}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">RBI:</span>
                                    <span className="value">{playerSeasonStats[0].rbis}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Hits:</span>
                                    <span className="value">{playerSeasonStats[0].hits}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Walks:</span>
                                    <span className="value">{playerSeasonStats[0].walks}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">K's:</span>
                                    <span className="value">{playerSeasonStats[0].strikeouts}</span>
                                </div>
                    </div>
                }
                </div>
                <div className="info-group">
                    <h2>Last 7 Stats</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="label">Avg:</span>
                            <span className="value">TBD</span>
                        </div>
                        <div className="info-item">
                            <span className="label">HR:</span>
                            <span className="value">TBD</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Hits:</span>
                            <span className="value">TBD</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Walks:</span>
                            <span className="value">TBD</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Ks:</span>
                            <span className="value">TBD</span>
                        </div>
                    </div>
                </div>
                {playerDailyStats && (
                    <div className="info-group full-width">
                        <h2>Box Scores</h2>
                        <div className="stats-grid">
                             {playerBio.position === 'P' ? playerDailyStats.map((pitcher) => (
                                 <div key={pitcher.pitcherId} className="stat-label">
                                        <div className="stat-item">
                                            <span className="stat-label">
                                                    {pitcher.inningsPitched + 'IP, '}
                                                    {pitcher.runs + 'R, '}
                                                    {pitcher.hits + 'H, '}
                                                    {pitcher.walks > 0 ? ' ' + pitcher.walks + 'BB' : ''}
                                                    {pitcher.strikeouts > 0 ? ' ' + pitcher.strikeouts + "K" : ''}
                                            </span>
                                        </div>
                                 </div>
                                ))
                                : playerDailyStats.map((batter) => (
                                        <div key={batter.playerId} className="stat-label">
                                            <span className="stat-label"> {batter.gameDate}</span>
                                            <div className="stat-item">
                                                <span className="stat-label">
                                                    {batter.hits + ' for ' + batter.atBats + '\n'}
                                                    {batter.homeruns > 0 ? ' ' + batter.homeruns + 'HR' : ''}
                                                    {batter.rbis > 0 ? ' ' + batter.rbis + 'RBI' : ''}
                                                    {batter.walks > 0 ? ' ' + batter.walks + 'BB' : ''}
                                                    {batter.strikeouts > 0 ? ' ' + batter.strikeouts + "K" : ''}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )
                            };
                        </div>
                    </div>
                )}
            </div>
    )
};


export default PlayerDetails;