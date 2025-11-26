import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import { bfs, getNodesInShortestPathOrder } from '../graphAlgorithms/bfs'; // Ensure these are imported
import BFSAnimation from '../graphAnimations/BFSAnimation';
import { dfs } from '../graphAlgorithms/dfs';
import DFSAnimation from '../graphAnimations/DFSAnimation';
import { dijkstra } from '../graphAlgorithms/dijkstra';
import DijkstraAnimation from '../graphAnimations/DijkstraAnimation';
import './PathfindingVisualizer.css';

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  
  // MOUSE STATE
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingFinish, setIsDraggingFinish] = useState(false);

  // NODE COORDINATES STATE (Initial positions)
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(35);

  useEffect(() => {
    const initialGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(initialGrid);
  }, []); // Run once on mount

  // --- MOUSE EVENT HANDLERS ---

  const handleMouseDown = (row, col) => {
    // 1. Check if we are grabbing the Start Node
    if (row === startNodeRow && col === startNodeCol) {
        setIsDraggingStart(true);
        setMouseIsPressed(true);
        return;
    }
    // 2. Check if we are grabbing the Finish Node
    if (row === finishNodeRow && col === finishNodeCol) {
        setIsDraggingFinish(true);
        setMouseIsPressed(true);
        return;
    }
    // 3. Otherwise, we are drawing a Wall
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    if (isDraggingStart) {
        // Prevent overlapping with finish node or walls
        if(row === finishNodeRow && col === finishNodeCol) return;
        
        // Move Start Node Visuals
        const newGrid = getNewGridWithMovedStart(grid, row, col, startNodeRow, startNodeCol);
        setGrid(newGrid);
        
        // Update Coordinates
        setStartNodeRow(row);
        setStartNodeCol(col);
    } 
    else if (isDraggingFinish) {
        // Prevent overlapping with start node or walls
        if(row === startNodeRow && col === startNodeCol) return;

        // Move Finish Node Visuals
        const newGrid = getNewGridWithMovedFinish(grid, row, col, finishNodeRow, finishNodeCol);
        setGrid(newGrid);
        
        // Update Coordinates
        setFinishNodeRow(row);
        setFinishNodeCol(col);
    } 
    else {
        // Normal Wall Drawing
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingFinish(false);
  };

  // --- ALGORITHM VISUALIZATION ---

  const handleReset = () => {
    // Reset to default positions or keep current? Let's keep current for user convenience
    // But we must clear walls and path colors
    const newGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(newGrid);
    
    // Clear DOM classes
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = document.getElementById(`node-${row}-${col}`);
        if (node) {
            node.className = 'node'; 
            if(row === startNodeRow && col === startNodeCol) node.classList.add('node-start');
            if(row === finishNodeRow && col === finishNodeCol) node.classList.add('node-finish');
        }
      }
    }
  };

  const visualizeAlgorithm = () => {
    if (algorithm === "Dijkstra") visualizeDijkstra();
    else if (algorithm === "BFS") visualizeBFS();
    else if (algorithm === "DFS") visualizeDFS();
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    DijkstraAnimation(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeBFS = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    BFSAnimation(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeDFS = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    DFSAnimation(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // --- RENDER ---

  return (
    <div>
      <div className="tool-bar">
        <button className="btn" onClick={handleReset}>Clear Board</button>
        <button className={`btn ${algorithm === "Dijkstra" ? 'btn-selected' : ''}`} onClick={() => setAlgorithm("Dijkstra")}>Dijkstra</button>
        <button className={`btn ${algorithm === "BFS" ? 'btn-selected' : ''}`} onClick={() => setAlgorithm("BFS")}>BFS</button>
        <button className={`btn ${algorithm === "DFS" ? 'btn-selected' : ''}`} onClick={() => setAlgorithm("DFS")}>DFS</button>
        {algorithm !== "" && (
            <button className="btn" style={{backgroundColor: '#28a745'}} onClick={visualizeAlgorithm}>Visualize {algorithm}!</button>
        )}
      </div>

      <div className="grid-container">
        {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
        ))}
      </div>
    </div>
  );
}

// --- HELPER FUNCTIONS FOR GRID UPDATES ---

const getInitialGrid = (startRow, startCol, finishRow, finishCol) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, startRow, startCol, finishRow, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, startRow, startCol, finishRow, finishCol) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  // Do not allow walls on start/finish nodes
  if(node.isStart || node.isFinish) return newGrid;

  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithMovedStart = (grid, newRow, newCol, oldRow, oldCol) => {
    const newGrid = grid.slice();
    
    // 1. Turn OFF old start node
    const oldNode = newGrid[oldRow][oldCol];
    newGrid[oldRow][oldCol] = { ...oldNode, isStart: false };
    
    // 2. Turn ON new start node
    const newNode = newGrid[newRow][newCol];
    newGrid[newRow][newCol] = { ...newNode, isStart: true, isWall: false }; // Clear wall if dragging over it
    
    return newGrid;
};

const getNewGridWithMovedFinish = (grid, newRow, newCol, oldRow, oldCol) => {
    const newGrid = grid.slice();
    
    // 1. Turn OFF old finish node
    const oldNode = newGrid[oldRow][oldCol];
    newGrid[oldRow][oldCol] = { ...oldNode, isFinish: false };
    
    // 2. Turn ON new finish node
    const newNode = newGrid[newRow][newCol];
    newGrid[newRow][newCol] = { ...newNode, isFinish: true, isWall: false };
    
    return newGrid;
};