import React from "react";
import Square from "./Square";
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares.slice()
    };
  }
  handleClick(i) {
    const squares = this.state.squares;
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    console.log(i,this.state.squares[i]);
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const squares = this.state.squares;
    // const current = history[history.length - 1];
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }
    let full = calculateFull(squares);
    let reset = null;
    if (winner || full) {
      reset = (<div onClick={() => {
        // reset squares
        this.setState({
          squares: this.props.squares.slice()
        })
        // update board
        // log scores?
      }}>reset</div>);
    }

    return (
      <div>
        <h1>TIC-TAC-TOE</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      {reset}
      </div>
    );
  }
}
function calculateFull(squares) {
  for (let i = 0; i < 9; i++ ) {
    console.log(i,squares[i])
    if (squares[i]=== null){
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
      return squares[a];
    }
  }
  return null;
}
