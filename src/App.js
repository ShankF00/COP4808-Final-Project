import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReadPost from './pages/ReadPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostInfo from './components/PostInfo'; // Import the PostInfo component
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Post</h1>
        <Link to="/"><button className="headerBtn"> View Post  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Post </button></Link>
      </div>
      <Routes>
        <Route path="/" element={<ReadPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/new" element={<CreatePost />} />
        {/* Add a route for Post info */}
        <Route path="/Post/:id" element={<PostInfo />} />
      </Routes>
    </div>
  );
}

export default App;

