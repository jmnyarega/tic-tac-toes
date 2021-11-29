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

function App() {
  const [values, setValues] = useState([]);
  // const [history, setHistory] = useState([]);
  const [turn, setTurn] = useState("X");
  const [xIndexes, setXindexes] = useState([]);
  const [oIndexes, setOindexes] = useState([]);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (values.length === 0) {
      setValues(Array(9).fill(null));
    }
  }, [values.length]);

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

    if (!winner && xIndexes.concat(oIndexes).length === 9) {
      setWinner("Draw");
    }
  }, [xIndexes, oIndexes, winner]);

  const reset = (e) => {
    e.preventDefault();
    setTurn("X");
    setValues(Array(9).fill(null));
    setXindexes([]);
    setOindexes([]);
    setWinner();
  };

  const travel = (e, i) => {
    e.preventDefault();
    let vals = values.slice();
    oIndexes
      .slice(i)
      .concat(xIndexes.slice(i))
      .forEach((x) => {
        vals[x] = null;
      });
    // console.log(vals);
    // setHistory(vals);
  };

  return (
    <main>
      <h1> Tic Tac Toe </h1>
      <div className="results">
        <p>
          {winner && winner !== "Draw" ? `Winner is ${winner}` : ""}
          {winner === "Draw" && "Draw"}
          {!winner ? `Turn ${turn}` : ""}
        </p>
        {/* eslint-disable-next-line */}
        <a href="" onClick={reset}>
          reset
        </a>
      </div>
      <Squares values={values} onClick={onClick} winner={winner} />
      <ul className="moves">
        <p>Moves:</p>
        {oIndexes.map((_, i) => (
          <li key={i}>
            {/* eslint-disable-next-line */}
            <a
              href=""
              onClick={(e) => travel(e, i)}
            >{`got to move ${xIndexes[i]}, ${oIndexes[i]}`}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
