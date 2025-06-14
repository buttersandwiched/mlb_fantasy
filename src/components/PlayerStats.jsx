import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchBatterSeasonStats  from "../lib/fetchBatterSeasonStats";
import fetchBatterDailyStats from "../lib/fetchBatterDailyStats";
import fetchPitcherDailyStats from "../lib/fetchPitcherDailyStats";
import fetchPitcherSeasonStats from "../lib/fetchPitcherSeasonStats";
import fetchPlayers from "../lib/fetchPlayers";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [dailyStats, setPlayerDailyStats] = useState([]);
    const [seasonStatsData, setPlayerSeasonStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // load player stats data from the database, filtered by playerId
        const loadPlayer = async () => {
            setIsLoading(true);
            setError(null);
            try {

                const playerBio = await fetchPlayers(null, playerId);
                setPlayer(playerBio)
                if (playerBio.position === 'P'){
                    const dailyData = await fetchPitcherDailyStats(playerId)
                    setPlayerDailyStats(dailyData)
                    const seasonData = await fetchPitcherSeasonStats(playerId)
                }
                else {
                    const dailyData = await fetchBatterDailyStats(playerId)
                    setPlayerDailyStats(dailyData)
                    const seasonData = await fetchBatterSeasonStats(playerId)
                    setPlayerSeasonStats(seasonData)
                    console.log('season', seasonData)
                    console.log('season stats data: ',seasonStatsData)
                }

           }catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadPlayer();
    }, [playerId]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading player statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <span className="error-icon">⚠️</span>
                Error: {error}
            </div>
        );
    }

return (
        <div className="player-info-grid">
            <div className="player-header">
                <h1>{playerBio.fullName}</h1>
            </div>
            <div className="info-group">
                <h2>Player Bio</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="label">Age:</span>
                            <span className="value">{playerBio.age}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">MLB Debut:</span>
                            <span className="value">{playerBio.mlbDebutDate}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Position:</span>
                            <span className="value">{playerBio.position}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Bat Side:</span>
                            <span className="value">{playerBio.batSide}</span>
                        </div>
                    </div>
            </div>
            <div className="info-group">
                <h2>Season Stats</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="label">
                                {playerBio.position==='P'? 'Wins':'Batting Avg'}
                            </span>
                            <span className="value">
                                {playerBio.position==='P' ? 'W': seasonStatsData.battingAverage}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">HR:</span>
                            <span className="value">{seasonStatsData.homeruns}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">RBI:</span>
                            <span className="value">{seasonStatsData.rbis}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Hits:</span>
                            <span className="value">{seasonStatsData.hits}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Walks:</span>
                            <span className="value">{seasonStatsData.walks}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">K's:</span>
                            <span className="value">{seasonStatsData.strikeouts}</span>
                        </div>
                    </div>
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
            {dailyStats && (
                <div className="info-group full-width">
                     <h2>Previous Games</h2>
                     <div className="stats-grid">
                         {playerBio.position==='P' ? dailyStats.map((pitcher) => (
                             <div className="stat-label" >
                                 <span className="stat-label"></span>
                                     <div key={pitcher.pitcherId} className="stat-item">
                                          <span className = "stat-label">
                                              <a>{pitcher.inningsPitched + 'IP,'}</a>
                                              <p>{pitcher.runs + 'Rs, '}
                                                 {pitcher.walks>0? pitcher.walks + 'BBs, ':''}
                                                 {pitcher.hits +'Hs, '}
                                                 {pitcher.strikeouts>0? pitcher.strikeouts +'Ks, ': ''}
                                              <a>{pitcher.pitchCount + 'pitches'}</a></p>
                                          </span>
                                     </div>
                             </div>
                         ))
                             : dailyStats.map((batter) => (
                             <div className="stat-label" >
                                 <span className="stat-label">{batter.gameId}</span>
                                     <div key={batter.batterId} className="stat-item">
                                          <span className = "stat-label">
                                              <a>{batter.hits} </a>
                                              {batter.homeruns>0?' ' + batter.homeruns + 'HR':''}
                                              {batter.rbis>0?' ' + batter.rbis + 'RBI':''}
                                              {batter.walks>0? ' ' + batter.walks + 'BB':''}
                                              {batter.strikeouts>0?' ' + batter.strikeouts + "K":''}
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
    );
};


export default PlayerDetails;