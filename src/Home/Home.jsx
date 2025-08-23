import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Home = () => {
  const [pageAnimation, setPageAnimation] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const buttonHandle = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setPageAnimation(true);
      setTimeout(() => {
        navigate("/games-interface");
      }, 800);
    }, 500);
  };

  return (
    <div>
      <Helmet>
        <title>GameHub | Home</title>
        <meta
          name="description"
          content="Welcome to GameHub, select and play your favorite games!"
        />
        <meta name="keywords" content="games, Tic Tac Toe, Sudoku, GameHub" />
      </Helmet>

      <div
        className={`${
          pageAnimation
            ? "-translate-y-1000 transition-transform duration-[1500ms]"
            : ""
        } animate-fade-up animate-once grid justify-center text-center gap-9`}
      >
        <div>
          <h1 className="text-white font-doto text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-[0_0_10px_#00f7ff] tracking-widest animate-pulse">
            Welcome to GameHub
          </h1>
          <span className="block mt-3 text-base md:text-xl lg:text-3xl md:mt-9 md:mb-5 text-gray-300 font-medium italic animate-fade animate-once">
            "Your gateway to endless fun!"
          </span>
        </div>

        <div onClick={buttonHandle}>
          <button
            onClick={() => {
              setButtonClicked(true);
              setTimeout(() => setButtonClicked(false), 500); // reset after animation
            }}
            className={`group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl 
        bg-neutral-900 px-10 md:px-12 font-bold hover:text-black shadow-lg
        transition-all duration-300
        ${buttonClicked ? "shadow-sky-400 scale-95 text-black " : "hover:shadow-sky-400"}
      `}
          >
            {/* Text */}
            <span className="relative z-10 text-2xl hover:text-black">Enter</span>

            {/* Background overlay */}
            <div
              className={`absolute inset-0 rounded-xl transition-colors duration-300
          ${
            buttonClicked ? " bg-white " : " bg-sky-500 "
          }
        `}
            ></div>

            {/* Arrow icon */}
            <div
              className={`absolute right-4 z-10 flex w-5 transition-all duration-300
          ${
            buttonClicked
              ? "translate-x-0 opacity-100"
              : "translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }
        `}
            >
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 font-bold "
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
