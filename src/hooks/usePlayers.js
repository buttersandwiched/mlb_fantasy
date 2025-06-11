import {useEffect, useState} from "react";
import {fetchPlayers} from "../lib/api";

export const usePlayers = (selectedTeam, selectedPlayer) => {
    const [players, setPlayers] = useState([])
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [filteredPlayers, setFilteredPlayers] = useState([])

    // set the initial state of the players select box
    useEffect(() => {
        const getPlayerList = async () => {
            try {
                setLoadingPlayers(true);
                const playerList = await fetchPlayers();
                setPlayers(playerList)
                setFilteredPlayers(playerList)
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingPlayers(false);
            }
        };
        getPlayerList();
    }, []);

    // filter the players based on the selected team and/or player
    useEffect( () => {
        //get the filtered player
        if (selectedPlayer) {
            setFilteredPlayers(players.filter(player => String(player.playerId) === String(selectedPlayer)))
        }
        // filter by team
        else  if (selectedTeam){
            const filteredPlayers = players.filter(player => String(player.teamId) === String(selectedTeam));
            setFilteredPlayers(filteredPlayers)
        }
        // get every player on every team
        else {
            setFilteredPlayers(players)
        }
    }, [selectedTeam, selectedPlayer, players])
    return {players, filteredPlayers, loadingPlayers}
}