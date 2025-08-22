import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";
import { Select } from "flowbite-react";
import FinalResult from "./FinalResult";

const Quiz = () => {
  const API_URL = import.meta.env.VITE_SERVER_API_URL;

  const [topics, setTopics] = useState({});
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5); // default 5 questions
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/topics`)
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("Failed to load topics:", err));
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !subtopic) {
      alert("Select topic and subtopic");
      return;
    }

    setLoading(true);
    setQuestions([]);
    setSelectedAnswers({});
    setPlayerScore(0);
    setQuizFinished(false);

    try {
      const res = await axios.post(`${API_URL}/generate-quiz`, {
        topic,
        subtopic,
        difficulty,
        numQuestions,
      });
      setQuestions(res.data);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (qIndex, optionIndex) => {
    const isCorrect = optionIndex === questions[qIndex].correct_index;

    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
    if (isCorrect) setPlayerScore((prev) => prev + 1);

    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        setCurrentQuestionIndex(null);
        setQuizFinished(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 text-red-100 roboto-slab-700">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-neon animate-pulse font-doto">
        Quiz Terminal
      </h1>

      <div
        className={`glassmorphism p-6 rounded-2xl flex justify-center items-center shadow-neon ${
          quizFinished
            ? "w-[300px] md:w-[700px] lg:w-[1000px]"
            : currentQuestionIndex !== null
            ? ""
            : "w-[300px] md:w-[400px] lg:w-[500px]"
        } transition-all duration-500`}
      >
        {/* Quiz Form */}
        {currentQuestionIndex === null && !quizFinished && (
          <form
            className="flex flex-col gap-5 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            {/* Topic */}
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
                  className="!bg-black !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
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

            {/* Subtopic */}
            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">Subtopic </label>
              <Select
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
                className="!bg-black !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
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

            {/* Difficulty */}
            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">Difficulty </label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="!bg-black !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%]"
                style={{ backgroundColor: "black", color: "white" }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </div>

            {/* Number of Questions */}
            <div className="flex justify-between">
              <label className="text-lg font-semibold mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="!bg-black !text-white !border-gray-700 !focus:border-primary-500 !focus:ring-primary-500 w-[60%] px-2 py-1 rounded"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-neon">
              {loading ? "Loading..." : "Start Quiz"}
            </button>
          </form>
        )}

        {/* Active Question */}
        {currentQuestionIndex !== null && questions[currentQuestionIndex] && (
          <QuizQuestion
            questionData={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
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
      <div className="mt-[50px]"/>
    </div>
  );
};

export default Quiz;
