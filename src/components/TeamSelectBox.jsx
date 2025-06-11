import '../app/App.css';

const TeamSelectBox = ({teams, setSelectedTeam, setSelectedPlayer, selectedTeam} ) => {

    const handleChange = (event) => {
        setSelectedTeam(event.target.value);
        setSelectedPlayer('');
    };

    return (
        <select className="App-select" onChange={handleChange} value={selectedTeam}>
            <option value="">Select a Team</option>
            {teams.map((team) => (
                <option className="App-select" key={team.teamId} value={team.teamId}> {team.teamName} </option>
            ))
            }
        </select>
    );
};

export default TeamSelectBox;