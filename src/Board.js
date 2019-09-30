import React from 'react';
import Square from './Square';

class Board extends React.PureComponent {
  renderSquare(i) {
    const { squares, onClick, values } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        values={values}
        i={i}
        key={`square${i}`}
      />
    );
  }

  renderBoardRow(i, arr) {
    return (
      <div key={`board-row${i}`} className="board-row">
        {arr.map(number => this.renderSquare(number + i * 20))}
      </div>
    );
  }

  render() {
    const arr = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ];
    return <div>{arr.map(i => this.renderBoardRow(i, arr))}</div>;
  }
}

export default Board;
