import React from "react";
import PropTypes from "prop-types";

function Square({ value, index, onClick, winner }) {
  return (
    <button disabled={value || winner} onClick={() => onClick(index)}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default Square;
