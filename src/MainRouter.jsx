import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import GamesInterface from "./Games/GamesInterface";
import GameSetup from "./Games/GameSetup";
import TicTacToe from "./Games/TicTacToe/TicTacToe";
import ErrorCommingSoon from "./ErrorCommingSoon";
import Sudoku from "./Games/Sudoku/Sudoku";
import Quiz from "./Games/Quiz/Quiz";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "games-interface", element: <GamesInterface /> },
      { path: "game-setup/:gameID", element: <GameSetup /> },
      { path: "/tic-tac-toe/:modeID/:gameKey", element: <TicTacToe /> },
      { path: "/sudoku", element: <Sudoku /> }, // Placeholder for Sudoku
      {path: "/quiz", element: <Quiz />}, // Placeholder for Quiz
      { path: "*", element: <ErrorCommingSoon /> },
    ],
  },
]);
export default MainRouter;
