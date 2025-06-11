const fetchTeams = async () => {
    try {
        let url = 'http://localhost:3000/api/teams'
        const response = await fetch(url);
        return await response.json()
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

export default fetchTeams;
