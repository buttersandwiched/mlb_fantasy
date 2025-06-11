import React, { useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import {useTeams} from "../../hooks/useTeams";
import {usePlayers} from "../../hooks/usePlayers";
import TeamSelectBox from "../TeamSelectBox";
import PlayerSelectBox from "./PlayerSelectBox";
import '../../app/App.css';
import {useParams} from "react-router-dom";
import {PlayerBioTable} from "./PlayerBioTable";


const PlayerDirectory = () =>{
    const [selectedTeam, setSelectedTeam] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const {teams, loadingTeams} = useTeams();
    const {players, filteredPlayers, loadingPlayers} = usePlayers(selectedTeam, selectedPlayer);

    if (loadingPlayers || loadingTeams) {
        return <div className="spinner"> Loading Page </div>
    }

    //render only when players and teams data are set
    return filteredPlayers && (
        <ErrorBoundary>
            <div className="select-player-container">
                <h1>MLB Player Directory</h1>
            </div>
            <div className="select-player-container">
                    <div className="select-player-box">
                        <TeamSelectBox selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam}
                                       setSelectedPlayer={setSelectedPlayer} teams={teams}
                        />
                    </div>
                    <div className="select-player-box">
                        <PlayerSelectBox players={filteredPlayers} setSelectedPlayer={setSelectedPlayer}
                        />
                    </div>
            </div>
            {filteredPlayers.length === 0 && !loadingPlayers ? (
                    <div className="error-message">
                        <p>No players selected.</p>
                    </div>
                ) : (
                    <PlayerBioTable players={filteredPlayers} />
                )}
        </ErrorBoundary>
    )};


export default PlayerDirectory;