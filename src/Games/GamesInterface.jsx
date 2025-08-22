import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // make sure Helmet is imported

const GamesInterface = () => {
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
      navigate("/game-setup/" + game);
    }, 900); // match your transition duration
  };

  return (
    <>
      <Helmet>
        <title>GameHub | Select a Game</title>
        <meta
          name="description"
          content="Welcome to GameHub, select and play your favorite games!"
        />
        <meta name="keywords" content="games, Tic Tac Toe, Sudoku, GameHub" />
      </Helmet>

      <div
        className={`text-center transition-transform duration-[1000ms] ${
          pageAnimation
            ? "translate-y-1000 transition-transform duration-[1100ms]"
            : ""
        } ${pageLoaded ? "" : "translate-x-1000"}`}
      >
        <h1 className="text-white font-doto text-3xl md:text-4xl font-bold drop-shadow-[0_0_10px_#00f7ff] tracking-widest animate-pulse">
          Select a game
        </h1>

        <div className="flex justify-center items-center gap-5 border border-white p-5 rounded-4xl mt-10">
          <div
            onClick={() => navigate("/quiz")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/quiz.png" alt="Quiz" />
            </div>
            <h3>Quiz</h3>
          </div>

          <div
            onClick={() => gameSelectionHandle("tic-tac-toe")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/TicTacToe.png" alt="Tic Tac Toe" />
            </div>
            <h3>Tic Tac Toe</h3>
          </div>

          <div
            onClick={() => gameSelectionHandle("sudoku")}
            className="w-[150px] grid items-center justify-center text-center hover:opacity-80 cursor-pointer transition-opacity"
          >
            <div>
              <img src="/GameIcons/Sudoku.png" alt="Sudoku" />
            </div>
            <p>Sudoku</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesInterface;
