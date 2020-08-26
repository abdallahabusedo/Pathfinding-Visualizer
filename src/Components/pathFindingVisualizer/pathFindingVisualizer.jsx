import React, { Component } from "react";
import Node from "./../Node/Node";
import "./pathFindingVisualizer.css";

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 49;

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
export default class pathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grid: [],
    };
  }

  componentDidMount() {
    const Grid = getInitialGrid();
    this.setState({ Grid });
  }
  render() {
    const Grid = this.state.Grid;
    console.log(Grid);
    return (
      <>
        <button className="PathFinding__BFSButton">
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
