import { useEffect, useState } from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import { Helmet } from "react-helmet-async";

const TicTacToe = () => {
  const [pageAnimation, setPageAnimation] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const [gameState, setGameState] = useState(
    Array(9)
      .fill(null)
      .map((_, i) => ({ cellIndex: i, cellValue: "" }))
  );

  const [isX, setIsX] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [winnerLine, setWinnerLine] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 100);
  }, []);

  const winningLines = [
    [0, 1, 2, "row-0"],
    [3, 4, 5, "row-1"],
    [6, 7, 8, "row-2"],
    [0, 3, 6, "col-0"],
    [1, 4, 7, "col-1"],
    [2, 5, 8, "col-2"],
    [0, 4, 8, "diag-0"],
    [2, 4, 6, "diag-1"],
  ];

  const handleCellClick = (cell) => {
    if (isFinished || cell.cellValue !== "") return;

    setGameState((prevState) =>
      prevState.map((c) =>
        c.cellIndex === cell.cellIndex
          ? { ...c, cellValue: isX ? "x" : "o" }
          : c
      )
    );
    setIsX((prev) => !prev);
  };

  // Winner + draw check
  useEffect(() => {
    const values = gameState.map((cell) => cell.cellValue);
    let foundWinner = null;

    for (const [a, b, c, line] of winningLines) {
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        foundWinner = values[a];
        setWinnerLine(line);
        break;
      }
    }

    if (foundWinner) {
      setWinner(foundWinner);
      setIsFinished(true);
      if (foundWinner === "x") setPlayerXScore((prev) => prev + 1);
      else setPlayerOScore((prev) => prev + 1);

      setTimeout(handleContinue, 1200);
    } else if (values.every((cell) => cell !== "")) {
      setWinner("Draw");
      setIsFinished(true);
      setTimeout(handleContinue, 1500);
    }
  }, [gameState]);

  const handleReset = () => {
    setPlayerOScore(0);
    setPlayerXScore(0);
    setGameState(
      Array(9)
        .fill(null)
        .map((_, i) => ({ cellIndex: i, cellValue: "" }))
    );
    setWinnerLine(null);
    setWinner(null);
    setIsFinished(false);
    setIsX(true);
  };

  const handleContinue = () => {
    setGameState(
      Array(9)
        .fill(null)
        .map((_, i) => ({ cellIndex: i, cellValue: "" }))
    );
    setWinnerLine(null);
    setWinner(null);
    setIsFinished(false);
    setIsX(true);
  };

  return (
    <div
      className={`text-center transition-transform duration-[1000ms] ${
        pageAnimation ? "-translate-x-[1000px]" : ""
      } ${pageLoaded ? "" : "translate-x-[1000px]"}`}
    >
      <Helmet>
        <title>GameHub | Tic Tac Toe</title>
        <meta
          name="description"
          content="Welcome to GameHub, select and play your favorite games!"
        />
        <meta name="keywords" content="games, Tic Tac Toe, Sudoku, GameHub" />
      </Helmet>
      <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-[0_0_15px_#00f7ff] mb-6">
        ⚡ Tic Tac Toe ⚡
      </h1>

      <div className="md:flex flex-row-reverse gap-10 items-center">
        {/* Scoreboard */}
        <div className="mt-8 space-y-3">
          <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_6px_#00f7ff]">
            Player X : {playerXScore}
          </h1>
          <h1 className="text-2xl font-bold text-pink-400 drop-shadow-[0_0_6px_#ff00ff]">
            Player O : {playerOScore}
          </h1>
        </div>

        {/* Board */}
        <div>
          <div className="mt-4 md:mr-4 relative inline-block">
            <div className="grid grid-cols-3  rounded-lg">
              {gameState.map((cell) => (
                <TicTacToeBoard
                  key={cell.cellIndex}
                  cell={cell}
                  isFinished={isFinished}
                  handleCellClick={handleCellClick}
                />
              ))}
            </div>

            {/* Winner line */}
            {winnerLine && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {winnerLine.includes("row") && (
                  <div
                    className="absolute left-0 right-0 h-1 bg-green-400 drop-shadow-[0_0_6px_#00ff15]"
                    style={{
                      top:
                        winnerLine === "row-0"
                          ? "18%"
                          : winnerLine === "row-1"
                          ? "50%"
                          : "83%",
                    }}
                  ></div>
                )}
                {winnerLine.includes("col") && (
                  <div
                    className="absolute top-9 bottom-0 w-1 h-[78%] bg-green-400 drop-shadow-[0_0_6px_#00ff15]"
                    style={{
                      left:
                        winnerLine === "col-0"
                          ? "16%"
                          : winnerLine === "col-1"
                          ? "50%"
                          : "82%",
                    }}
                  ></div>
                )}
                {winnerLine === "diag-0" && (
                  <div className="absolute top-[50%] left-[50%] h-1 bg-green-400 drop-shadow-[0_0_6px_#00ff15] rotate-45 -translate-x-1/2 -translate-y-1/2 origin-center w-[120%]" />
                )}
                {winnerLine === "diag-1" && (
                  <div className="absolute top-[50%] left-[50%] h-1 bg-green-400 drop-shadow-[0_0_6px_#00ff15] rotate-[-45deg] -translate-x-1/2 -translate-y-1/2 origin-center w-[120%]" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Turn indicator */}
        <div>
          {!isFinished ? (
            <h2
              className={`text-2xl mt-6 ${
                isX ? " text-cyan-400" : " text-pink-400 "
              }  drop-shadow-[0_0_6px_#ffd700]`}
            >
              Player {isX ? "X" : "O"}’s turn
            </h2>
          ) : (
            <h2
              className={`text-2xl mt-6 font-bold ${
                winner === "x"
                  ? "text-cyan-400 drop-shadow-[0_0_6px_#00f7ff]"
                  : winner === "o"
                  ? "text-pink-400 drop-shadow-[0_0_6px_#ff00ff]"
                  : "text-gray-300"
              }`}
            >
              {winner === "Draw"
                ? "It's a Draw!"
                : ` Winner: ${winner.toUpperCase()} `}
            </h2>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 md:ml-5 flex justify-center gap-6">
        <button
          onClick={handleReset}
          className="h-12 rounded-md bg-red-500/80 px-8 py-2 font-bold text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/40"
        >
          Restart
        </button>
        <button
          onClick={handleContinue}
          className="h-12 rounded-md bg-green-500/80 px-8 py-2 font-bold text-white hover:bg-green-600 transition-all shadow-lg shadow-green-500/40"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
