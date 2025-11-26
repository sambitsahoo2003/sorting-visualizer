import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import { bfs, getNodesInShortestPathOrder } from '../graphAlgorithms/bfs';
import BFSAnimation from '../graphAnimations/BFSAnimation';
import { dfs } from '../graphAlgorithms/dfs';
import DFSAnimation from '../graphAnimations/DFSAnimation';
import { dijkstra } from '../graphAlgorithms/dijkstra';
import DijkstraAnimation from '../graphAnimations/DijkstraAnimation';
import './PathfindingVisualizer.css';

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingFinish, setIsDraggingFinish] = useState(false);

  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(35);

  useEffect(() => {
    const initialGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(initialGrid);
  }, []); 

  const handleMouseDown = (row, col) => {
    if (row === startNodeRow && col === startNodeCol) {
        setIsDraggingStart(true);
        setMouseIsPressed(true);
        return;
    }
    if (row === finishNodeRow && col === finishNodeCol) {
        setIsDraggingFinish(true);
        setMouseIsPressed(true);
        return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    if (isDraggingStart) {
        if(row === finishNodeRow && col === finishNodeCol) return;
        
        const newGrid = getNewGridWithMovedStart(grid, row, col, startNodeRow, startNodeCol);
        setGrid(newGrid);
        
        setStartNodeRow(row);
        setStartNodeCol(col);
    } 
    else if (isDraggingFinish) {
        if(row === startNodeRow && col === startNodeCol) return;

        const newGrid = getNewGridWithMovedFinish(grid, row, col, finishNodeRow, finishNodeCol);
        setGrid(newGrid);
        
        setFinishNodeRow(row);
        setFinishNodeCol(col);
    } 
    else {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingFinish(false);
  };

  const handleReset = () => {
    const newGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(newGrid);

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
    
    const oldNode = newGrid[oldRow][oldCol];
    newGrid[oldRow][oldCol] = { ...oldNode, isStart: false };
    
    const newNode = newGrid[newRow][newCol];
    newGrid[newRow][newCol] = { ...newNode, isStart: true, isWall: false }; 
    
    return newGrid;
};

const getNewGridWithMovedFinish = (grid, newRow, newCol, oldRow, oldCol) => {
    const newGrid = grid.slice();
    
    const oldNode = newGrid[oldRow][oldCol];
    newGrid[oldRow][oldCol] = { ...oldNode, isFinish: false };
    
    const newNode = newGrid[newRow][newCol];
    newGrid[newRow][newCol] = { ...newNode, isFinish: true, isWall: false };
    
    return newGrid;
};