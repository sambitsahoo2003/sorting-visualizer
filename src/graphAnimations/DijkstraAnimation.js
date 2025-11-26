export default function DijkstraAnimation(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }

        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const isStartOrFinish = node.isStart || node.isFinish;
            
            if(!isStartOrFinish) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }
        }, 10 * i);
    }
}

function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const isStartOrFinish = node.isStart || node.isFinish;
            if(!isStartOrFinish) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-path';
            }
        }, 50 * i);
    }
}