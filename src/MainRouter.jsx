import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import GamesInterface from "./Games/GamesInterface";
import GameSetup from "./Games/GameSetup";
import TicTacToe from "./Games/TicTacToe/TicTacToe";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "games-interface", element: <GamesInterface /> },
      { path: "game-setup/:gameID", element: <GameSetup /> },
      {path:"/tic-tac-toe/:modeID/:gameKey", element: <TicTacToe />},
    ],
  },
]);
export default MainRouter;
