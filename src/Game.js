import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Board from "./Board";
import "./App.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      values: null,
      reOdered: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || this.state.winner) {
      return;
    }

    let column = i % 20;
    let row = (i - column) / 20;

    squares[i] = this.state.xIsNext ? "X" : "O";
    let hangDoc = checkHangDoc(row, column, i, squares);
    let hangNgang = checkHangNgang(row, column, i, squares);
    let hangCheo1 = checkHangCheo1(row, column, i, squares);
    let hangCheo2 = checkHangCheo2(row, column, i, squares);
    if (hangDoc || hangNgang || hangCheo1 || hangCheo2) {
      this.setState({
        winner: squares[i],
        values: hangDoc || hangNgang || hangCheo1 || hangCheo2
      });
    }

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      valuea: null
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: null
    });
  }
  restart() {
    this.setState({
      history: [
        {
          squares: Array(400).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      values: null,
      reOdered: false
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;
    const values = this.state.values;
    const reOdered = this.state.reOdered;
    var moves = null;
    if (reOdered) {
      moves = history.map((step, move) => {
        let newMove = history.length - move - 1;
        const desc = move ? "Go to move #" + newMove : "Go to game start";
        return (
          <li key={newMove}>
            <Button
              color="secondary"
              className="btn my-1"
              onClick={() => this.jumpTo(newMove)}
            >
              {desc}
            </Button>
          </li>
        );
      });
    } else {
      moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
          <li key={move}>
            <Button
              color="secondary"
              className="btn my-1"
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </Button>
          </li>
        );
      });
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="d-flex">
            <Button
              color="primary"
              className="mb-4 ml-5 mr-5"
              onClick={() => this.restart()}
            >
              Restart
            </Button>
            <h5 className="ml-5">{status}</h5>
          </div>

          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            values={values}
          />
        </div>

        <div className="game-info">
          <h4>Infomation</h4>
          <hr></hr>
          <Button
            outline
            color="primary m-1 p-1"
            className="btn btn-sm"
            onClick={() => {
              this.setState({ reOdered: !reOdered });
            }}
          >
            Re-odered
          </Button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function checkHangDoc(row, column, value, squares) {
  let begin,
    end,
    count = 1;

  if (row === 0) {
    begin = 0;
    end = 4;
  } else if (row === 19) {
    end = 19;
    begin = 19 - 4;
  } else {
    while (count < 5) {
      if (row - count >= 0) begin = row - count;
      if (row + count <= 19) end = row + count;
      count++;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= end - begin - 4; i++) {
      if (
        squares[20 * (begin + i - 1) + column] === null ||
        squares[20 * (begin + i + 5) + column] === null
      )
        if (
          squares[20 * (begin + i) + column] &&
          squares[column + 20 * (begin + i + 1)] ===
            squares[column + 20 * (begin + i)] &&
          squares[column + 20 * (begin + i + 2)] ===
            squares[column + 20 * (begin + i)] &&
          squares[column + 20 * (begin + i + 3)] ===
            squares[column + 20 * (begin + i)] &&
          squares[column + 20 * (begin + i + 4)] ===
            squares[column + 20 * (begin + i)]
        )
          return [
            20 * (begin + i) + column,
            column + 20 * (begin + i + 1),
            column + 20 * (begin + i + 2),
            column + 20 * (begin + i + 3),
            column + 20 * (begin + i + 4)
          ];
    }
  }

  return null;
}

function checkHangNgang(row, column, value, squares) {
  let begin,
    end,
    count = 1;
  if (column === 0) {
    begin = 0;
    end = 4;
  } else if (column === 19) {
    end = 19;
    begin = 19 - 4;
  } else {
    while (count < 5) {
      if (column - count >= 0) begin = column - count;
      if (column + count <= 19) end = column + count;
      count++;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= end - begin - 4; i++) {
      if (squares[value - begin] === null || squares[value + end + 1] === null)
        if (
          squares[row * 20 + begin + i] &&
          squares[row * 20 + begin + i + 1] === squares[row * 20 + begin + i] &&
          squares[row * 20 + begin + i + 2] === squares[row * 20 + begin + i] &&
          squares[row * 20 + begin + i + 3] === squares[row * 20 + begin + i] &&
          squares[row * 20 + begin + i + 4] === squares[row * 20 + begin + i]
        )
          return [
            row * 20 + begin + i,
            row * 20 + begin + i + 1,
            row * 20 + begin + i + 2,
            row * 20 + begin + i + 3,
            row * 20 + begin + i + 4
          ];
    }
  }

  return null;
}

function checkHangCheo1(row, column, value, squares) {
  let row1,
    column1,
    row2,
    count = 1;
  if (row === 19 && column === 0) return;
  else if (row === 0 || column === 0) {
    row1 = row;
    column1 = column;

    row2 = row + 4;
  } else if (row === 19) {
    row1 = row - 4;
    column1 = column - 4;
    row2 = row;
  } else {
    while (count < 5) {
      if (row - count >= 0 && column - count >= 0) {
        row1 = row - count;
        column1 = column - count;
      }
      if (row + count <= 19 && column + count <= 19) {
        row2 = row + count;
      }
      count++;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= row2 - row1 - 4; i++) {
      if (
        squares[20 * (row1 + i - 1) + column1 + i - 1] === null ||
        squares[20 * (row1 + i + 5) + column1 + i + 5] === null
      )
        if (
          squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 1) + column1 + 1] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 2) + column1 + 2] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 3) + column1 + 3] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 4) + column1 + 4] ===
            squares[20 * (row1 + i) + column1]
        )
          return [
            20 * (row1 + i) + column1,
            20 * (row1 + i + 1) + column1 + 1,
            20 * (row1 + i + 2) + column1 + 2,
            20 * (row1 + i + 3) + column1 + 3,
            20 * (row1 + i + 4) + column1 + 4
          ];
    }
  }
}

function checkHangCheo2(row, column, value, squares) {
  let row1,
    column1,
    column2,
    count = 1;

  if (row === 19 || column === 19) {
    return;
  } else if (column === 0) {
    row1 = row;
    column1 = column;
    column2 = row + 4;
  } else if (row === 0 || column === 19) {
    row1 = row;
    column1 = column;
    column2 = column - 4;
  } else {
    while (count < 5) {
      if (row - count >= 0 && column + count <= 19) {
        row1 = row - count;
        column1 = column + count;
      }
      if (row + count <= 19 && column - count >= 0) {
        column2 = column - count;
      }
      count++;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= column1 - column2 - 4; i++) {
      if (
        squares[20 * (row1 + i - 1) + column1 + i + 1] === null ||
        squares[20 * (row1 + i + 5) + column1 + i - 5] === null
      )
        if (
          squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 1) + column1 - 1] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 2) + column1 - 2] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 3) + column1 - 3] ===
            squares[20 * (row1 + i) + column1] &&
          squares[20 * (row1 + i + 4) + column1 - 4] ===
            squares[20 * (row1 + i) + column1]
        )
          return [
            20 * (row1 + i) + column1,
            20 * (row1 + i + 1) + column1 - 1,
            20 * (row1 + i + 2) + column1 - 2,
            20 * (row1 + i + 3) + column1 - 3,
            20 * (row1 + i + 4) + column1 - 4
          ];
    }
  }
}

export default Game;
