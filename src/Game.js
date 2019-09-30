import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Board from './Board';
import './App.css';

function checkHangDoc(row, column, value, squares) {
  let begin;
  let end;
  let count = 1;

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
      count += 1;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= end - begin - 4; i += 1) {
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
  let begin;
  let end;
  let count = 1;
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
      count += 1;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= end - begin - 4; i += 1) {
      if (squares[value - 5 + i] === null || squares[value - i + 1] === null)
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
  let row1;
  let column1;
  let row2;
  let count = 1;
  if (row === 19 && column === 0) return null;
  if (row === 0 || column === 0) {
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
      count += 1;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= row2 - row1 - 4; i += 1) {
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

  return null;
}

function checkHangCheo2(row, column, value, squares) {
  let row1;
  let column1;
  let column2;
  let count = 1;

  if (row === 19 || column === 19) {
    return null;
  }
  if (column === 0) {
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
      count += 1;
    }
  }

  if (squares !== undefined) {
    for (let i = 0; i <= column1 - column2 - 4; i += 1) {
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

  return null;
}

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
      values: [null],
      reOdered: false
    };
  }

  handleClick(i) {
    const { history, stepNumber, winner, xIsNext, values } = this.state;
    const history1 = history.slice(0, stepNumber + 1);
    const current = history1[history1.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || winner) {
      return;
    }

    const column = i % 20;
    const row = (i - column) / 20;

    squares[i] = xIsNext ? 'X' : 'O';
    const hangDoc = checkHangDoc(row, column, i, squares);
    const hangNgang = checkHangNgang(row, column, i, squares);
    const hangCheo1 = checkHangCheo1(row, column, i, squares);
    const hangCheo2 = checkHangCheo2(row, column, i, squares);
    const result = hangDoc || hangNgang || hangCheo1 || hangCheo2;
    values[stepNumber + 1] = result;

    if (result) {
      this.setState({
        winner: squares[i],
        values,
        history: history1.concat([
          {
            squares
          }
        ]),
        stepNumber: history1.length
      });
    } else {
      this.setState({
        history: history1.concat([
          {
            squares
          }
        ]),
        stepNumber: history1.length,
        xIsNext: !xIsNext,
        values,
        winner: null
      });
    }
  }

  jumpTo(step) {
    const { values } = this.state;
    const result = values[step];
    if (result === null || result === undefined) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
        winner: null
      });
    } else {
      this.setState({
        stepNumber: step
      });
    }
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
      values: [
        {
          result: Array(5).fill(null)
        }
      ],
      reOdered: false
    });
  }

  render() {
    const {
      history,
      winner,
      values,
      reOdered,
      stepNumber,
      xIsNext
    } = this.state;

    const current = history[stepNumber];
    const result = values[stepNumber];
    let moves = null;

    if (reOdered) {
      moves = history.map((step, move) => {
        const newMove = history.length - move - 1;
        const desc = newMove ? `Go to move #  ${newMove}` : 'Go to game start';
        return (
          <li key={move.toString()}>
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
        const desc = move ? `Go to move #  ${move}` : 'Go to game start';
        return (
          <li key={move.toString()}>
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
      status = `Winner:${winner}`;
    } else {
      status = `Next player:${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game  ">
        <div className="game-board ">
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
            values={result}
          />
        </div>

        <div className="game-info ">
          <h4>Infomation</h4>
          <hr />
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

export default Game;
