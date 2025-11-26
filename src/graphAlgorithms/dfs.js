// Performs Depth-First Search
// Returns all nodes in the order they were visited.
export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [];
    
    // Push start node to stack
    stack.push(startNode);

    while (stack.length > 0) {
        const currentNode = stack.pop(); // Pop from end (LIFO)

        // If it's a wall, ignore it
        if (currentNode.isWall) continue;

        // If we have already visited this node, skip it
        // (We might have added the same neighbor multiple times in the stack)
        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        
        for (const neighbor of unvisitedNeighbors) {
            // Store reference for backtracking the path later
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }
    return visitedNodesInOrder;
}

// Helper: Get neighbors (Up, Down, Left, Right)
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    
    // Check Up
    if (row > 0) neighbors.push(grid[row - 1][col]);
    // Check Down
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    // Check Left
    if (col > 0) neighbors.push(grid[row][col - 1]);
    // Check Right
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    // Return only those not visited
    // Note: We filter walls in the main loop, but filtering here is also fine
    return neighbors.filter(neighbor => !neighbor.isVisited);
}