import React, {useEffect, useState} from "react";
import '../../app/App.css';


const PlayerSelectBox = ({players, setSelectedPlayer, selectedPlayer}) => {

    const handlePlayerChange = (e) => {
        // Get the value of the selected player from the dropdown)
       setSelectedPlayer(e.target.value)
    };

    return ( //Return a select box with all players in the database
        <select className="App-select" onChange={handlePlayerChange} value={selectedPlayer}>
            <option value="">Select a Player</option>
            {players.map((player) => (
                <option key={player.playerId} value={player.playerId}>{player.fullName} </option>
            ))
            }
        </select>
    )
};

export default PlayerSelectBox;