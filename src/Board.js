import React from "react";
import Square from "./Square";
import PropTypes from "prop-types";

class Board extends React.Component {
  static propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func,
    values: PropTypes.array
  };

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        values={this.props.values}
        i={i}
      />
    );
  }
  renderBoardRow(i, arr) {
    return (
      <div className="board-row">
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
