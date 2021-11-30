import { useEffect, useState } from "react";
import "./App.css";
import Squares from "./Squares";

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const determineWinner = (x, o) => {
  for (let i = 0; i < winningPositions.length; i++) {
    if (winningPositions[i].every((w) => x.includes(w))) {
      return "X";
    } else if (winningPositions[i].every((w) => o.includes(w))) {
      return "O";
    }
  }
};

/*
 * Bugs
 * Design Principles
 * Data Structures
 * Testing
 */

function App() {
  const [values, setValues] = useState([]);
  const [turn, setTurn] = useState("X");
  const [xIndexes, setXindexes] = useState([]);
  const [oIndexes, setOindexes] = useState([]);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (values.length === 0) {
      setValues(Array(9).fill(null));
    }
  }, [values]);

  const onClick = (index) => {
    const vals = values.slice();
    if (turn === "X") {
      vals[index] = "X";
      setXindexes(xIndexes.concat(index));
      setTurn("O");
    } else {
      vals[index] = "O";
      setOindexes(oIndexes.concat(index));
      setTurn("X");
    }
    setValues(vals);
  };

  useEffect(() => {
    if (xIndexes.length >= 3 || oIndexes.length >= 3) {
      setWinner(determineWinner(xIndexes, oIndexes));
    }
  }, [xIndexes, oIndexes]);

  const reset = (e) => {
    e.preventDefault();
    setTurn("X");
    setValues(Array(9).fill(null));
    setXindexes([]);
    setOindexes([]);
    setWinner();
  };

  const displayResults = (winner) => {
    if (winner === "Draw") {
      return winner;
    } else if (winner === "X" || winner === "O") {
      return `Winner is ${winner}`;
    } else if (!winner && oIndexes.concat(xIndexes).length === 9) {
      return "Draw";
    } else return `Turn ${turn}`;
  };
  return (
    <main>
      <h1> Tic Tac Toe </h1>
      <div className="results">
        <p>{displayResults(winner)}</p>
        {/* eslint-disable-next-line */}
        <a href="" onClick={reset}>
          reset
        </a>
      </div>
      <Squares values={values} onClick={onClick} winner={winner} />
    </main>
  );
}

export default App;
