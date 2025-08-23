import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";
import { Select, TextInput, Tooltip } from "flowbite-react";
import FinalResult from "./FinalResult";
import { Helmet } from "react-helmet-async";

const Quiz = () => {
  const API_URL = import.meta.env.VITE_SERVER_API_URL;

  const [topics, setTopics] = useState({});
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [tempSelected, setTempSelected] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [formTransition, setFormTransition] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/topics`)
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("Failed to load topics:", err));
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([]);
    setSelectedAnswers({});
    setTempSelected({});
    setPlayerScore(0);
    setQuizFinished(false);

    try {
      const res = await axios.post(`${API_URL}/generate-quiz`, {
        topic,
        subtopic,
        difficulty,
        numQuestions,
      });

      setFormTransition(true);
      setTimeout(() => {
        setQuestions(res.data);
        setCurrentQuestionIndex(0);
        setFormTransition(false);
      }, 700);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch quiz");
      setFormTransition(false);
    } finally {
      setLoading(false);
    }
  };

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  const handleAnswerSelect = (qIndex, optionIndex) => {
    if (tempSelected[qIndex] !== undefined) return; // prevent double clicks
    setTempSelected((prev) => ({ ...prev, [qIndex]: optionIndex }));

    setTimeout(() => {
      const isCorrect = optionIndex === questions[qIndex].correct_index;
      setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
      if (isCorrect) setPlayerScore((prev) => prev + 1);

      setTempSelected((prev) => {
        const copy = { ...prev };
        delete copy[qIndex];
        return copy;
      });

      if (qIndex + 1 >= questions.length) {
        setCurrentQuestionIndex(null);
        setQuizFinished(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 2000);
  };

  const [isWrongNumber, setIsWrongNumber] = useState(false);

  const handleQuantityChange = (e) => {
    const valueQuantity = e.target.value;
    const valueQuantityNumber = Number(valueQuantity);
    console.log(valueQuantityNumber);
    if (
      (valueQuantityNumber >= 1 && valueQuantityNumber <= 20) ||
      valueQuantity === ""
    ) {
      setNumQuestions(valueQuantity);
      console.log(valueQuantity);
      setIsWrongNumber(false);
    } else {
      setNumQuestions(numQuestions);
      console.log(" Wrong Number");
      setIsWrongNumber(true);
      setTimeout(() => {
        setIsWrongNumber(false);
      }, 3000);
    }
  };

  const [pageAnimation, setPageAnimation] = useState(false);
  return (
    <div
      className={`flex flex-col justify-center items-center p-6 roboto-slab-700 transition-transform duration-[1000ms] ${
        pageAnimation
          ? "translate-y-1000 transition-transform duration-[1100ms]"
          : ""
      } ${pageLoaded ? "" : "-translate-x-1000"}`}
    >
      <Helmet>
        <title>GameHub | Quiz</title>
        <meta
          name="description"
          content="Welcome to GameHub, select and play your favorite games!"
        />
        <meta name="keywords" content="games, Tic Tac Toe, Sudoku, GameHub" />
      </Helmet>

      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-neon animate-pulse font-doto">
        Quiz Terminal
      </h1>

      <div
        className={` p-6 rounded-2xl flex justify-center items-center shadow-neon transition-all duration-1000
          ${
            quizFinished
              ? "w-[300px] md:w-[700px] lg:w-[1000px]"
              : currentQuestionIndex !== null
              ? ""
              : "w-[300px] md:w-[400px] lg:w-[500px]"
          }
          ${formTransition ? "scale-200 opacity-0 pointer-events-none" : ""}
        `}
      >
        {/* Quiz Form */}
        {currentQuestionIndex === null && !quizFinished && (
          <form
            className="flex flex-col gap-5 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="flex justify-between">
                <label className="text-lg font-bold mb-1">Topic</label>
                <Select
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setSubtopic("");
                  }}
                  id="topic"
                  required
                  className=" !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <option
                    value=""
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Select topic
                  </option>
                  {Object.keys(topics).map((t) => (
                    <option
                      key={t}
                      value={t}
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      {t}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">Subtopic </label>
              <Select
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
                className=" !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
                required
                style={{ backgroundColor: "black", color: "white" }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Select subtopic
                </option>
                {topics[topic]?.map((st) => (
                  <option
                    key={st}
                    value={st}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    {st}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">Difficulty </label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className=" !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
                style={{ backgroundColor: "black", color: "white" }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </div>

            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">Quantity</label>
              <div className="w-[60%] ">
                <TextInput
                  value={numQuestions}
                  onChange={(e) => handleQuantityChange(e)}
                  className="!text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-full"
                  style={{
                    backgroundColor: isWrongNumber ? "red" : "black",
                    color: "white",
                  }}
                  placeholder="5"
                />
              </div>
            </div>

            {isWrongNumber && (
              <p className="text-red-600">
                You have to give a real number. Which is less then 21 and geater
                then 0!!!
              </p>
            )}

            <div className="flex justify-center text-center ">
              <button type="submit" disabled={loading} className="btn-neon ">
                {loading ? "Loading..." : "Start Quiz"}
              </button>
            </div>
          </form>
        )}

        {/* Active Question */}
        {currentQuestionIndex !== null &&
          questions[currentQuestionIndex] &&
          !formTransition && (
            <QuizQuestion
              questionData={questions[currentQuestionIndex]}
              index={currentQuestionIndex}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
              tempSelectedOption={tempSelected[currentQuestionIndex]}
              handleAnswerSelect={handleAnswerSelect}
            />
          )}

        {/* Final Result */}
        {quizFinished && (
          <FinalResult
            questions={questions}
            selectedAnswers={selectedAnswers}
            playerScore={playerScore}
          />
        )}
      </div>
      <div className="mt-[50px]" />
    </div>
  );
};

export default Quiz;
