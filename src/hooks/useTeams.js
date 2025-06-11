import {useEffect, useState} from "react";
import {fetchTeams} from "../lib/api";

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [loadingTeams, setLoadingTeams] = useState(true);

    // set the initial state of the teams select box
    useEffect(() => {
        const getTeams = async () => {
            try {
                setLoadingTeams(true);
                const teamsList = await fetchTeams();
                setTeams(teamsList)
            }catch (err) {
                console.error(err);
            }
            finally {
                setLoadingTeams(false);
            }
        };
        getTeams()

    }, []);
    return {teams, loadingTeams}
}