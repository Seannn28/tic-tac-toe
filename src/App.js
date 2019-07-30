import React from "react";
import Board from "./Board";
import "./App.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [null,null,null,null,null,null,null,null,null],
      xIsNext: true
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} />
        </div>
      </div>
    );
  }
}

// ========================================
export default Game;
