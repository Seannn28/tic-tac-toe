import React from "react";
import logo from "./logo.svg";
import Board from "./Board";
import "./App.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      history: [],
      xIsNext: true
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} history={this.state.history} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
export default Game;
