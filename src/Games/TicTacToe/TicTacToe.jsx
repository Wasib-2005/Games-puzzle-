import { useEffect, useState } from "react";

const TicTacToe = () => {
  const [pageAnimation, setPageAnimation] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

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

const handleCellClick = (index) => {
  if (isFinished) return;

  setGameState((prevState) => {
    const newState = prevState.map((cell) =>
      cell.cellIndex === index.cellIndex && cell.cellValue === ""
        ? { ...cell, cellValue: isX ? "x" : "o" }
        : cell
    );

    // Extract only cell values
    const gameStateOnlyCellValue = newState.map((cell) => cell.cellValue);
    console.log("Game State Only Cell Value:", gameStateOnlyCellValue);

    // Check for winner (vanilla if style)
    let winner = null;
    if (gameStateOnlyCellValue[0] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[1] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[2])
      winner = gameStateOnlyCellValue[0];
    else if (gameStateOnlyCellValue[3] && gameStateOnlyCellValue[3] === gameStateOnlyCellValue[4] && gameStateOnlyCellValue[3] === gameStateOnlyCellValue[5])
      winner = gameStateOnlyCellValue[3];
    else if (gameStateOnlyCellValue[6] && gameStateOnlyCellValue[6] === gameStateOnlyCellValue[7] && gameStateOnlyCellValue[6] === gameStateOnlyCellValue[8])
      winner = gameStateOnlyCellValue[6];
    else if (gameStateOnlyCellValue[0] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[3] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[6])
      winner = gameStateOnlyCellValue[0];
    else if (gameStateOnlyCellValue[1] && gameStateOnlyCellValue[1] === gameStateOnlyCellValue[4] && gameStateOnlyCellValue[1] === gameStateOnlyCellValue[7])
      winner = gameStateOnlyCellValue[1];
    else if (gameStateOnlyCellValue[2] && gameStateOnlyCellValue[2] === gameStateOnlyCellValue[5] && gameStateOnlyCellValue[2] === gameStateOnlyCellValue[8])
      winner = gameStateOnlyCellValue[2];
    else if (gameStateOnlyCellValue[0] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[4] && gameStateOnlyCellValue[0] === gameStateOnlyCellValue[8])
      winner = gameStateOnlyCellValue[0];
    else if (gameStateOnlyCellValue[2] && gameStateOnlyCellValue[2] === gameStateOnlyCellValue[4] && gameStateOnlyCellValue[2] === gameStateOnlyCellValue[6])
      winner = gameStateOnlyCellValue[2];

    if (winner) {
      console.log("Winner is:", winner);
      setIsFinished(true);
    }

    return newState;
  });

  setIsX((prev) => !prev);
};

  return (
    <div
      className={`text-center transition-transform duration-[1000ms] ${
        pageAnimation
          ? "-translate-x-[1000px] transition-transform duration-[1100ms]"
          : ""
      } ${pageLoaded ? "" : "translate-x-[1000px]"}`}
    >
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      <div className="mt-10">
        <div className="grid grid-cols-3 border-1">
          {gameState.map((index) => (
            <div
              key={index + index.cellIndex}
              onClick={() => handleCellClick(index)}
              className={`border-2 w-[100px] h-[100px] flex items-center justify-center text-6xl cursor-pointer ${
                index.cellValue === "" && !isFinished ? "hover:bg-gray-400" : ""
              }`}
            >
              {index.cellValue}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
