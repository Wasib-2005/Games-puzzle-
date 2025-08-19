import { useEffect, useState } from "react";

const TicTacToe = () => {
  const [pageAnimation, setPageAnimation] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [playerXScore, setPlayerXSCore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  const [gameState, setGameState] = useState([
    { cellIndex: 0, cellValue: "" },
    { cellIndex: 1, cellValue: "" },
    { cellIndex: 2, cellValue: "" },
    { cellIndex: 3, cellValue: "" },
    { cellIndex: 4, cellValue: "" },
    { cellIndex: 5, cellValue: "" },
    { cellIndex: 6, cellValue: "" },
    { cellIndex: 7, cellValue: "" },
    { cellIndex: 8, cellValue: "" },
  ]);

  const [isX, setIsX] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [winnerLine, setWinnerLine] = useState(null);

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
    if (isFinished) return;

    setGameState((prevState) =>
      prevState.map((c) =>
        c.cellIndex === cell.cellIndex && c.cellValue === ""
          ? { ...c, cellValue: isX ? "x" : "o" }
          : c
      )
    );

    setIsX((prev) => !prev);
  };

  // Winner check
  useEffect(() => {
    const gameStateOnlyCellValue = gameState.map((cell) => cell.cellValue);
    let winner = null;

    for (const [a, b, c, line] of winningLines) {
      if (
        gameStateOnlyCellValue[a] &&
        gameStateOnlyCellValue[a] === gameStateOnlyCellValue[b] &&
        gameStateOnlyCellValue[a] === gameStateOnlyCellValue[c]
      ) {
        winner = gameStateOnlyCellValue[a];
        setWinnerLine(line);
        break;
      }
    }

    if (winner) {
      setIsFinished(true);
      if (winner === "x") setPlayerXSCore((prev) => prev + 1);
      else setPlayerOScore((prev) => prev + 1);
    }
  }, [gameState]);

  const handleReset = () => {
    setPlayerOScore(0);
    setPlayerXSCore(0);
    setGameState(gameState.map((cell) => ({ ...cell, cellValue: "" })));
    setWinnerLine(null);
    setIsFinished(false);
  };

  const handleContinue = () => {
    setGameState(gameState.map((cell) => ({ ...cell, cellValue: "" })));
    setIsFinished(false);
    setWinnerLine(null);
    setIsX(true);
  };

  return (
    <div
      className={`text-center transition-transform duration-[1000ms] ${
        pageAnimation
          ? "-translate-x-[1000px] transition-transform duration-[1100ms]"
          : ""
      } ${pageLoaded ? "" : "translate-x-[1000px]"}`}
    >
      <h1 className="text-5xl font-extrabold drop-shadow-[0_0_15px_#00f7ff] mb-6">
        ⚡ Tic Tac Toe ⚡
      </h1>

      <div className="md:flex flex-row-reverse gap-10 items-center">
        <div className="mt-8 space-y-3">
          <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_6px_#00f7ff]">
            Player X : {playerXScore}
          </h1>
          <h1 className="text-2xl font-bold text-pink-400 drop-shadow-[0_0_6px_#ff00ff]">
            Player O : {playerOScore}
          </h1>
        </div>

        <div>
          <div className="mt-4 relative inline-block">
            <div className="grid grid-cols-3 border-[3px] border-gray-600 rounded-lg">
              {gameState.map((cell) => (
                <div
                  key={cell.cellIndex}
                  onClick={() => handleCellClick(cell)}
                  className={`border-[3px] border-gray-700 w-[100px] h-[100px] flex items-center justify-center text-6xl cursor-pointer transition-colors duration-200
                    ${
                      cell.cellValue === "" && !isFinished
                        ? "hover:bg-gray-800/40"
                        : ""
                    } 
                    ${cell.cellValue === "x" ? "text-cyan-400 drop-shadow-[0_0_10px_#00f7ff]" : ""}
                    ${cell.cellValue === "o" ? "text-pink-400 drop-shadow-[0_0_10px_#ff00ff]" : ""}
                  `}
                >
                  {cell.cellValue}
                </div>
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

        <div>
          <h2 className="text-2xl mt-6 text-yellow-300 drop-shadow-[0_0_6px_#ffd700]">
            Player {isX ? "X" : "O"}’s turn
          </h2>
        </div>
      </div>

      <div className="mt-8 md:ml-5 flex justify-center gap-6">
        <button
          onClick={handleReset}
          className="group relative h-12 rounded-md bg-red-500/80 px-8 py-2 font-bold text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/40"
        >
          Restart
        </button>
        <button
          onClick={handleContinue}
          className="group relative h-12 rounded-md bg-green-500/80 px-8 py-2 font-bold text-white hover:bg-green-600 transition-all shadow-lg shadow-green-500/40"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
