# Algorithm Visualizer

A dynamic and interactive web application built with **React** to visualize classic Computer Science algorithms. This project provides a clear demonstration of how **Sorting Algorithms** and **Pathfinding Algorithms** work step-by-step.

## Live Demo
[View Live Demo](#) 

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Algorithms Implemented](#algorithms-implemented)
  - [Sorting](#sorting-algorithms)
  - [Pathfinding](#pathfinding-algorithms)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Technologies Used](#technologies-used)

## About the Project
This tool was designed to help students and developers visualize the inner workings of algorithms. It features a clean landing page that routes users to two distinct visualization modules:
1.  **Sorting Visualizer:** Sorts a random or user-defined array of bars.
2.  **Pathfinding Visualizer:** Finds paths between nodes on a 2D grid.

## Features
* **Interactive Landing Page:** Clean UI to switch between Sorting and Pathfinding modes.
* **Real-time Animation:** Smooth visual feedback for every swap, comparison, and path step.
* **Custom Inputs:**
    * *Sorting:* Users can enter their own custom array values.
    * *Pathfinding:* Users can draw walls and drag Start/End nodes.
* **Responsive Design:** Adjusts grid and bar sizes dynamically.

## Algorithms Implemented

### Sorting Algorithms
* **Bubble Sort:** A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
* **Insertion Sort:** Builds the final sorted array one item at a time.
* **Merge Sort:** An efficient, stable, divide-and-conquer algorithm.
* **Quick Sort:** An efficient, divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array.

### Pathfinding Algorithms
* **Dijkstra's Algorithm:** The father of pathfinding algorithms; guarantees the shortest path.
* **Breadth-First Search (BFS):** Explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. Guarantees the shortest path in an unweighted grid.
* **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Does *not* guarantee the shortest path.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
* Node.js installed on your local machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/algorithm-visualizer.git](https://github.com/your-username/algorithm-visualizer.git)
    ```
2.  **Navigate to the project directory**
    ```bash
    cd algorithm-visualizer
    ```
3.  **Install dependencies**
    ```bash
    npm install
    ```
4.  **Install React Router** (if not already added)
    ```bash
    npm install react-router-dom
    ```
5.  **Start the application**
    ```bash
    npm start
    ```
    Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage Guide

### Sorting Visualizer
1.  Click **"Generate New Array"** to create random data.
2.  Use the **Range Slider** to adjust the array size and sorting speed.
3.  Click **"Set Custom Array"** to input your own comma-separated numbers (e.g., `10, 50, 25, 90`).
4.  Select an algorithm (e.g., **Merge Sort**) to begin the animation.

### Pathfinding Visualizer
1.  **Drag & Drop:** Click and hold the **Green Node** (Start) or **Red Node** (Finish) to move them.
2.  **Draw Walls:** Click and drag on empty white cells to create walls/obstacles.
3.  **Select Algorithm:** Choose between **Dijkstra**, **BFS**, or **DFS**.
4.  Click **Visualize!** to watch the algorithm find the path.
5.  Click **Clear Board** to reset the grid.

## Technologies Used
* **React.js:** Frontend library for building the user interface.
* **React Router:** For handling navigation between pages.
* **CSS3:** For custom animations and styling.
* **Javascript (ES6+):** For algorithm logic and DOM manipulation.