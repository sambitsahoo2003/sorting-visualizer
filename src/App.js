import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage'
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;