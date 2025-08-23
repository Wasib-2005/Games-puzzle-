import React, { useEffect, useState } from "react";

// --- Sudoku utility functions ---
const clone = (board) => board.map((row) => [...row]);
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const range = (n) => [...Array(n).keys()];
const findEmpty = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return { r, c };
    }
  }
  return null;
};
const isSafe = (board, r, c, n) => {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === n || board[i][c] === n) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[br + i][bc + j] === n) return false;
    }
  }
  return true;
};
const solveBoard = (board) => {
  const b = clone(board);
  const step = () => {
    const empty = findEmpty(b);
    if (!empty) return true;
    const { r, c } = empty;
    for (let n = 1; n <= 9; n++) {
      if (isSafe(b, r, c, n)) {
        b[r][c] = n;
        if (step()) return true;
        b[r][c] = 0;
      }
    }
    return false;
  };
  return step() ? b : null;
};
const generateFull = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const fill = () => {
    const empty = findEmpty(board);
    if (!empty) return true;
    const { r, c } = empty;
    for (const n of shuffle(range(9).map((i) => i + 1))) {
      if (isSafe(board, r, c, n)) {
        board[r][c] = n;
        if (fill()) return true;
        board[r][c] = 0;
      }
    }
    return false;
  };
  fill();
  return board;
};
const makePuzzle = (solution, holes = 45) => {
  const puzzle = clone(solution);
  const indices = shuffle(range(81));
  let removed = 0;
  for (const idx of indices) {
    if (removed >= holes) break;
    const r = Math.floor(idx / 9);
    const c = idx % 9;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    const solved = solveBoard(puzzle);
    if (solved) removed++;
    else puzzle[r][c] = backup;
  }
  return puzzle;
};

// --- Sudoku Component ---
export default function Sudoku() {
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [solution, setSolution] = useState(null);
  const [fixed, setFixed] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [selected, setSelected] = useState(null);
  const [mistakes, setMistakes] = useState(new Set());
  const [won, setWon] = useState(false);

  const restart = () => {
    const full = generateFull();
    const puzz = makePuzzle(full, 45);
    setBoard(puzz);
    setSolution(full);
    setFixed(puzz.map((row) => row.map((v) => v !== 0)));
    setSelected(null);
    setMistakes(new Set());
    setWon(false);
  };

  useEffect(() => {
    restart();
  }, []);

  const setCell = (r, c, val) => {
    if (fixed[r][c]) return;
    setBoard((prev) => {
      const next = clone(prev);
      next[r][c] = val;
      return next;
    });
    const key = `${r},${c}`;
    setMistakes((prev) => {
      const next = new Set(prev);
      if (val === 0) next.delete(key);
      else if (solution && val !== solution[r][c]) next.add(key);
      else next.delete(key);
      return next;
    });
  };

  const onKeyDown = (e, r, c) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete")
      return;
    e.preventDefault();
    if (fixed[r][c]) return;
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
      setCell(r, c, 0);
      return;
    }
    setCell(r, c, parseInt(e.key, 10));
  };

  const giveHint = () => {
    if (!solution) return;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!fixed[r][c] && board[r][c] !== solution[r][c]) {
          setCell(r, c, solution[r][c]);
          return;
        }
      }
    }
  };

  const solveNow = () => {
    if (!solution) return;
    setBoard(clone(solution));
    setMistakes(new Set());
    setWon(true);
  };
  const resetBoard = () => {
    setBoard((prev) =>
      prev.map((row, r) => row.map((_, c) => (fixed[r][c] ? prev[r][c] : 0)))
    );
    setSelected(null);
    setMistakes(new Set());
    setWon(false);
  };
  const [pageAnimation, setPageAnimation] = useState(false);

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center p-6 roboto-slab-700 transition-transform duration-[1000ms] ${
        pageAnimation
          ? "translate-y-1000 transition-transform duration-[1100ms]"
          : ""
      } ${pageLoaded ? "" : "-translate-y-1000"}`}
    >
      <div className="flex flex-col items-center justify-start min-h-screen py-10 text-white">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">🧩 Sudoku</h1>
        <div className="grid grid-cols-9 gap-0 bg-white/10 border-4 border-gray-500 rounded-lg">
          {board.map((row, r) => (
            <React.Fragment key={r}>
              {row.map((val, c) => {
                const borderClasses = `
                border
                ${r % 3 === 0 ? "border-t-4" : ""}
                ${c % 3 === 0 ? "border-l-4" : ""}
                ${r === 8 ? "border-b-4" : ""}
                ${c === 8 ? "border-r-4" : ""}
                border-gray-500
              `;
                return (
                  <div
                    key={`${r}-${c}`}
                    tabIndex={0}
                    onKeyDown={(e) => onKeyDown(e, r, c)}
                    onClick={() => setSelected({ r, c })}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg font-semibold transition ${borderClasses} ${
                      fixed[r][c]
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-700 text-white"
                    } ${
                      selected && selected.r === r && selected.c === c
                        ? "ring-2 ring-purple-400"
                        : ""
                    } ${
                      mistakes.has(`${r},${c}`)
                        ? "bg-red-600/70 ring-2 ring-red-400"
                        : ""
                    }`}
                  >
                    {fixed[r][c] ? (
                      val || ""
                    ) : (
                      <input
                        className="w-full h-full text-center bg-transparent outline-none"
                        inputMode="numeric"
                        maxLength={1}
                        value={val === 0 ? "" : String(val)}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^1-9]/g, "");
                          setCell(r, c, raw ? parseInt(raw, 10) : 0);
                        }}
                        onFocus={() => setSelected({ r, c })}
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={restart}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-md"
          >
            New Game
          </button>
          <button
            onClick={resetBoard}
            className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 shadow-md"
          >
            Reset
          </button>
          <button
            onClick={giveHint}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
          >
            Hint
          </button>
          <button
            onClick={solveNow}
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 shadow-md"
          >
            Solve
          </button>
        </div>
        {won && (
          <div className="mt-4 text-green-300 font-bold text-xl drop-shadow">
            🎉 Congratulations! You solved it! 🎉
          </div>
        )}
        <p className="mt-4 text-sm text-gray-200">
          Click a cell and type 1–9. Use Backspace/Delete to clear. Hint fills
          one correct cell.
        </p>
      </div>
    </div>
  );
}
