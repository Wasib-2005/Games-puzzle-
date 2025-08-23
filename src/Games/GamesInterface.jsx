import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GamesInterface = () => {
  useEffect(() => {
    document.title = "GameHub | Select a Game (Debug)";
  }, []);

  const navigate = useNavigate();

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  const [pageAnimation, setPageAnimation] = useState(false);

  const gameSelectionHandle = (game) => {
    setPageAnimation(true); // trigger animation

    // wait for animation to finish before navigating
    setTimeout(() => {
      navigate(game);
    }, 900); // match your transition duration
  };

  return (
    <div>
      <div
        className={`text-center transition-transform duration-[1000ms] ${
          pageAnimation
            ? "translate-y-1000 transition-transform duration-[1100ms]"
            : ""
        } ${pageLoaded ? "" : "translate-x-1000"}`}
      >
        <h1 className="text-white font-doto text-4xl md:text-6xl font-bold drop-shadow-[0_0_10px_#00f7ff] tracking-widest animate-pulse">
          Select a game
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4  justify-center items-center gap-5 md:gap-12 border border-white p-5 rounded-4xl mt-10 md:text-xl">
          <div
            onClick={() => gameSelectionHandle("/quiz")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/quiz.png" alt="Quiz" />
            </div>
            <h3>Quiz</h3>
          </div>

          <div
            onClick={() => gameSelectionHandle("/tic-tac-toe/offline_mode/none")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/TicTacToe.png" alt="Tic Tac Toe" />
            </div>
            <h3>Tic Tac Toe</h3>
          </div>

          <div
            onClick={() => gameSelectionHandle("/sudoku")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/Sudoku.png" alt="Sudoku" />
            </div>
            <p>Sudoku</p>
          </div>
          <div className="w-[150px] h-full border rounded-2xl bg-gray-300 text-black grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity">
            <div>
              <p className="text-3xl">More comming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesInterface;
