import React, { Component } from "react";
import Node from "./../Node/Node";
import "./pathFindingVisualizer.css";
import {
  Algorithm,
  getNodesInShortestPathOrder,
} from "./../BFS Algorithm/BFS.js";
const START_NODE_ROW = 0;
const START_NODE_COL = 49;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 1;

const getInitialGrid = () => {
  const Grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    Grid.push(currentRow);
  }
  return Grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default class pathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount = () => {
    const Grid = getInitialGrid();
    this.setState({ Grid });
  };
  handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(this.state.Grid, row, col);
    this.setState({ Grid: newGrid, mouseIsPressed: true });
  };
  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.Grid, row, col);
    this.setState({ Grid: newGrid });
  };
  handelMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };
  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  visualizeAlgorithm() {
    const { Grid } = this.state;
    const startNode = Grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = Grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Algorithm(Grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }
  render() {
    const { Grid, mouseIsPressed } = this.state;
    return (
      <>
        <button
          className="PathFinding__BFSButton"
          onClick={() => this.visualizeAlgorithm()}
        >
          Visualize BFS Algorithm
        </button>
        <div className="Grid">
          {Grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
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
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handelMouseUp}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
