const TicTacToeBoard = ({ cell, isFinished, handleCellClick }) => {
  console.log("Rendering cell:", cell);
  return (
    <div
      onClick={() => {
        handleCellClick(cell);
      }}
      className={`border-[4px] border-gray-300 w-[100px] h-[100px] flex items-center justify-center text-6xl cursor-pointer transition-colors duration-200
                    ${
                      cell.cellValue === "" && !isFinished
                        ? "hover:bg-gray-800/40"
                        : ""
                    } 
                    ${
                      cell.cellValue === "x"
                        ? "text-cyan-400 drop-shadow-[0_0_10px_#00f7ff]"
                        : ""
                    }
                    ${
                      cell.cellValue === "o"
                        ? "text-pink-400 drop-shadow-[0_0_10px_#ff00ff]"
                        : ""
                    }
                    ${cell.cellIndex === 0 ? " border-l-0 border-t-0 " : ""}
                    ${cell.cellIndex === 1 ? " border-t-0 " : ""}
                    ${cell.cellIndex === 2 ? " border-r-0 border-t-0 " : ""}
                    ${cell.cellIndex === 3 ? " border-l-0 " : ""}
                    ${cell.cellIndex === 5 ? " border-r-0 " : ""}
                    ${cell.cellIndex === 6 ? " border-l-0 border-b-0 " : ""}
                    ${cell.cellIndex === 7 ? " border-b-0 " : ""}
                    ${cell.cellIndex === 8 ? " border-r-0 border-b-0 " : ""}
                  `}
    >
      {cell.cellValue}
    </div>
  );
};

export default TicTacToeBoard;
