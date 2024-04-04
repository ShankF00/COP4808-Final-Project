import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReadCrewmates from './pages/ReadCrewmates';
import CreatePost from './pages/CreateCrewmates';
import EditPost from './pages/EditCrewmates';
import CrewmateInfo from './components/CrewmateInfo'; // Import the CrewmateInfo component
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Crewmates</h1>
        <Link to="/"><button className="headerBtn"> View Crewmates  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Crewmate </button></Link>
      </div>
      <Routes>
        <Route path="/" element={<ReadCrewmates />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/new" element={<CreatePost />} />
        {/* Add a route for crewmate info */}
        <Route path="/crewmate/:id" element={<CrewmateInfo />} />
      </Routes>
    </div>
  );
}

export default App;
