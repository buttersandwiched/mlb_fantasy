export const fetchPlayers = async () => {
    try {
        let url = 'http://localhost:3000/api/players'
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.error('Error fetching teams:', error)
        return [];
    }
};

export const fetchTeams = async () => {
    try {
        let url = 'http://localhost:3000/api/teams'
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

const fetchBatterSeasonStats = async (selectedPlayerId) => {
    let url = `http://localhost:3000/api/batters/seasonStats`
    try {
        if (selectedPlayerId) {
           url += `/${selectedPlayerId}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

export default fetchBatterSeasonStats;