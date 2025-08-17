import { FloatingLabel, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameSetup = () => {
  const navigate = useNavigate();

  const { gameID } = useParams();
  console.log("Game ID:", gameID);
  
  const [pageAnimation, setPageAnimation] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  const gameName = gameID
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [mode, setMode] = useState("Offline-Mode");

  const handleGame = (e) => {
    e.preventDefault();
    console.log("Selected Mode:", mode, "Game ID:", gameID);
    setPageAnimation(true);
    setTimeout(() => {
      if (mode === "Offline-Mode") {
        navigate(
          "/" + gameID + "/" + mode.toLowerCase().replace(/-/g, "_") + "/none"
        );
      }
    }, 800);
  };

  return (
    <div
      className={`text-center transition-transform duration-[1000ms] ${
        pageAnimation
          ? "-translate-x-[1000px] transition-transform duration-[1100ms]"
          : ""
      } ${pageLoaded ? "" : "-translate-x-[1000px]"}`}
    >
      <form>
        <div>
          <h4>
            <Label className="text-3xl font-bold" htmlFor="game-mode">
              Game Mode Selection
            </Label>
          </h4>
          <hr className="my-5 border-dashed" />
          <h4 className="text-2xl mt-2">Game Name: {gameName}</h4>
        </div>
        <div className="flex items-center justify-between w-[250px] mt-12">
          <p>Game Mode:</p>
          <div className="w-[100px]">
            <Select
              id="game-mode"
              onChange={(e) => setMode(e.target.value)}
              required
              className="bg-black text-white appearance-none"
            >
              <option className="bg-gray-800" value="Offline-Mode">
                Offline
              </option>
              <option className="bg-gray-800" value="Public-Mode">
                Public
              </option>
              <option className="bg-gray-800" value="Private-Mode">
                Private
              </option>
            </Select>
          </div>
        </div>
        <div
          className={`${
            mode === "Private-Mode"
              ? " border-2 border-white rounded-xl mt-6 "
              : "hidden"
          }`}
        >
          <FloatingLabel
            variant="outlined"
            label="Key"
            color="default"
            className="!bg-black "
          />
        </div>
        <div className="mt-6 flex items-center justify-center text-black">
          <button onClick={handleGame} className="cssbuttons-io-button">
            <p>{mode === "Public-Mode" ? "Find" : "Start"}</p>
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameSetup;
