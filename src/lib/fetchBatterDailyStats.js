const fetchBatterDailyStats = async (selectedPlayerId) => {
    let playerURL = `http://localhost:3000/api/batters`

    try {
        if (selectedPlayerId) {
            playerURL += `/${selectedPlayerId}/dailyStats`;
        }

        const playerResponse= await fetch(playerURL);
        if (!playerResponse.ok) {
            throw new Error(`HTTP error! status: ${playerResponse.status}`);
        }
        return await playerResponse.json();
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};

export default fetchBatterDailyStats;