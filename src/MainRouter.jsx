import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import GamesInterface from "./Games/GamesInterface";
import TicTacToeSetup from "./Games/TicTacToe/TicTacToeSetup";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "games-interface", element: <GamesInterface /> },
      { path: "tic-tac-toe-setup", element: <TicTacToeSetup /> },
    ],
  },
]);
export default MainRouter;
