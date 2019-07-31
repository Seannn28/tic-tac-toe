import React from "react";
import Square from "./Square";

import Timer from "./timer";
import Scoreboard from "./Scoreboard";
import scoreboard from "./Scoreboard";

let previoustime = null;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares.slice(),
      player1timer: 20000,
      player2timer: 20000,
      player1score: 0,
      player2score: 0,
      xIsNext: null
    };

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(this.updateTimer);
  }

  updateTimer = (now) => {
    if (!previoustime) previoustime = now;
    let delta = now - previoustime;
    previoustime = now
    requestAnimationFrame(this.updateTimer);
    if (this.state.xIsNext === true) {
      const t = this.state.player1timer - delta;
      if(t <0) {
        this.setState({
          outoftime: "Player X",
          player2score: +1,
          xIsNext: null
        })

      
      }
      else {
        this.setState({ player1timer: t});

      }

      
    } else if (this.state.xIsNext === false) {
      const t = this.state.player2timer - delta;
      if(t < 0 ){
        this.setState({
          outoftime: "Player O",
          player1score: +1,
          xIsNext:null
        })
      }
      this.setState({ player2timer: t});
    }
  };

  handleClick(i) {
    const squares = this.state.squares;
    if (this.state.squares[i]){
      return;
    }else if(this.state.outoftime) {
      return;
    }
    console.log(this.state.player1score)
    if(this.state.player1score >= 4){
      return;
  
    }

    if(this.state.player2score >= 4){
      return;
  
    }


    let w = calculateWinner(squares);
    if (w.winner) {
      return;
    }


    squares[i] = this.state.xIsNext ? "X" : "O";
    let w2 = calculateWinner(squares);

    if (w2.winner) {
      if (w2.winner==="X") {
        this.setState({
          player1score: this.state.player1score + 1
       })
 
      } else {
        this.setState({
          player2score: this.state.player2score + 1
       })
 
      }
      this.setState({
        squares: squares,
        xIsNext: null
      });

    } else {
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
    }
    
  }

  renderSquare(i, winning) {
    return (
      <Square
        winning={winning}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  reset() {
    // reset game state
    if(this.state.player1score >=4 || this.state.player2score >=4 ) {
      this.setState({
        player1score:0,
        player2score:0,
      })
      
    }
    this.setState({
      squares: this.props.squares.slice(),
      xIsNext: null,
      player1timer: 20000,
      player2timer: 20000,
      outoftime: null,
    });
    // update board
    // log scores?
  }

  render() {
    const squares = this.state.squares;
    // const current = history[history.length - 1];
    const { winner, line } = calculateWinner(this.state.squares);
    let full = calculateFull(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (full) {
      status = "Its a draw!";
    } else if (this.state.outoftime) {
      status = "Out of time: " + this.state.outoftime; 
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    let Reset = null;
    if(this.state.player1score >= 4 || this.state.player2score >= 4 || winner || full || this.state.outoftime){
      Reset = (
        <div className="resetbutton" onClick={this.reset}>
          Reset
        </div>
        
      );
    }

      if(this.state.outoftime) {

      }
      return (
      <div>
        <h1>TIC-TAC-TOE</h1>
        <h2>Space Edition</h2>
        <div className="status">{status}</div>
        <div className="squares">
          {this.renderSquare(0, line && line.indexOf(0))}
          {this.renderSquare(1, line && line.indexOf(1))}
          {this.renderSquare(2, line && line.indexOf(2))}

          {this.renderSquare(3, line && line.indexOf(3))}
          {this.renderSquare(4, line && line.indexOf(4))}
          {this.renderSquare(5, line && line.indexOf(5))}

          {this.renderSquare(6, line && line.indexOf(6))}
          {this.renderSquare(7, line && line.indexOf(7))}
          {this.renderSquare(8, line && line.indexOf(8))}
        </div>
        <div>
          <Timer time={this.state.player1timer} paused={this.state.xIsNext} title={"Player X timer: "} />
          <Timer time={this.state.player2timer} paused={!this.state.xIsNext} title={"Player O timer: "} />
        </div>
        <div>
          <Scoreboard scoreboard ={this.state.player1score} title={"Player X score: "} />
          <Scoreboard scoreboard ={this.state.player2score} title={"Player O score: "} />
        </div>
        <div>{Reset}</div>
      </div>
    );
  }
}

function calculateFull(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      return false;
    }
  }

  return true;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
