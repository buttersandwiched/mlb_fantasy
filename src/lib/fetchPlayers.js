const fetchPlayers = async () => {
    try {
        let url = 'http://localhost:3000/api/players'
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.error('Error fetching teams:', error)
        return [];
    }
};

export default fetchPlayers;
