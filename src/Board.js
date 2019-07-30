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
    const { winner, line } = calculateWinner(this.state.squares)
    if (winner || this.state.squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
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

  render() {
    const squares = this.state.squares;
    // const current = history[history.length - 1];
    const { winner, line } = calculateWinner(this.state.squares);
    console.log(winner,line)
    let full = calculateFull(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }else if(full){
      status = 'Its a draw!' 

    
    }else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    let Reset = null;
    if (winner || full) {
      Reset = (<div className="resetbutton" onClick={() => {
        // reset squares
        this.setState({
          squares: this.props.squares.slice()
        })
        // update board
        // log scores?
      }}>Reset</div>);
    }

    return (
      <div>
        <h1>TIC-TAC-TOE</h1>
        <h2>Space Edition</h2>
        <div className="status">{status}</div>
        <div className="squares">
          {this.renderSquare(0, line && line.indexOf(0) )}
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
        
        </div>
        <div>
            {Reset}
        </div>
        
    
      </div>
    );
  }
}
function calculateFull(squares) {
  for (let i = 0; i < 9; i++ ) {
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
