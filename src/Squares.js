import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";

const Squares = ({ values, onClick, winner }) => (
  <div className="squares">
    {values?.map((value, i) => (
      <Square
        key={i}
        value={value}
        index={i}
        onClick={onClick}
        winner={winner}
      />
    ))}
  </div>
);

Squares.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
};

export default Squares;
