const fetchBatterSeasonStats = async (selectedPlayerId) => {
    let url = `http://localhost:3000/api/batters`
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