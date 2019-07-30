import React from "react";
import Board from "./Board";
import "./App.css";
import { Link, Route } from "wouter";
import AboutUs from "./AboutUs";

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
        <Link href="/SeansTICTACTOE/">
          <a className="link">Learn about the game</a>
        </Link>
        <Link href="/">
          <a className="link">Play the game</a>
        </Link>

        <Route path="/SeansTICTACTOE"><div><AboutUs /></div></Route>
        <Route path="/">
        <div className="game-board">
          <Board squares={this.state.squares} />

        </div>
        </Route>
      </div>
    );
  }
}

// ========================================
export default Game;
