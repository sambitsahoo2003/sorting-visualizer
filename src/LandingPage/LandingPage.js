import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="main-title">Algorithm Visualizer</h1>
      <p className="subtitle">Select a domain to visualize algorithms in action</p>
      
      <div className="options-container">
        <div className="card" onClick={() => navigate('/sorting')}>
          <div className="icon-box sorting-icon">
            <div className="bar b1"></div>
            <div className="bar b2"></div>
            <div className="bar b3"></div>
            <div className="bar b4"></div>
          </div>
          <h2>Sorting Algorithms</h2>
          <p>Visualize Bubble, Merge, Quick, and Insertion Sort on array bars.</p>
        </div>

        <div className="card" onClick={() => navigate('/pathfinding')}>
          <div className="icon-box path-icon">
             <div className="node-icon start"></div>
             <div className="node-icon path"></div>
             <div className="node-icon end"></div>
          </div>
          <h2>Pathfinding Algorithms</h2>
          <p>Visualize Dijkstra, BFS, and DFS on a 2D grid.</p>
        </div>
      </div>
    </div>
  );
}