// Performs Breadth-First Search
// Returns all nodes in the order they were visited.
// Also makes sure to point .previousNode for backtracking.
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    // Create a queue and add the startNode
    // In JS, we can use a simple array as a queue with .push() and .shift()
    const queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        
        // If we hit a wall, skip (though ideally we don't add walls to queue)
        if (currentNode.isWall) continue;

        visitedNodesInOrder.push(currentNode);

        // If we reached the destination
        if (currentNode === finishNode) return visitedNodesInOrder;

        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        
        for (const neighbor of unvisitedNeighbors) {
            neighbor.isVisited = true;
            // Key step: keep track of how we got here to reconstruct path later
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
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
    
    // Return only those not visited and not walls
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

// Backtracks from the finishNode to find the shortest path.
// Only works after the algorithm has run (because previousNode must be set).
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    // Keep tracing back until we hit the start (which has no previousNode)
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}