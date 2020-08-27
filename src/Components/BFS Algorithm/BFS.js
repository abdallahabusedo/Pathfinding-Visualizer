/**
 *
 * @param {*} grid
 * @function getAllNodes
 * @description store all nodes in the Nodes array
 */
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
/**
 *
 * @param {*} unVisitedNode
 * @function sortNodesByDistance
 * @description sort Nodes By Distance
 */
function sortNodesByDistance(unVisitedNode) {
  unVisitedNode.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/**
 *
 * @param {*} node
 * @param {*} grid
 * @function updateUnvisitedNeighbors
 * @description update Unvisited Neighbors
 */
function updateUnvisitedNeighbors(node, grid) {
  const unVisitedNeighbors = getUnVisitedNeighbors(node, grid);
  for (const neighbor of unVisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
/**
 *
 * @param {*} node
 * @param {*} grid
 * @function getUnVisitedNeighbors
 * @description get UnVisited Neighbors
 */

function getUnVisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid.length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
/**
 *
 * @param {*} finishNode
 * @function getNodesInShortestPathOrder
 * @description get Nodes In Shortest Path Order
 */
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
/**
 *
 * @param {*} grid
 * @param {*} startNode
 * @param {*} finishNode
 * @function
 */
export function Dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}
