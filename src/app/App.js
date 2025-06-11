import './App.css';
import '../index.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Players from "../components/Player/PlayerDirectory";
import PlayerDetails from '../components/Player/PlayerDetails'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/players" element={<Players/>}/>
                    <Route path="/players/:playerId" element={<PlayerDetails/>}/>
                </Routes>
          </div>
      </Router>

  );
}

export default App;
