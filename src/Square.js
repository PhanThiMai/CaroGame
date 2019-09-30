import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

class Square extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    values: PropTypes.array,
    i: PropTypes.number
  };

  render() {
    var { onClick, value, values, i } = this.props;
    let className = "square";
    if (values !== null) {
      if (values.indexOf(i) !== -1) {
        className = "square1";
      } else className = "square";
    }

    return (
      <Button color="warning" className={className} onClick={onClick}>
        {value}
      </Button>
    );
  }
}

export default Square;
