import React from "react";

const FinalResult = ({ questions = [], selectedAnswers = [], playerScore = 0 }) => {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col gap-5 w-full items-center font-doto">
        <h2 className="text-3xl font-bold mb-4 text-neon-glow">Quiz Review</h2>
        <p className="text-white text-lg">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5 items-center ">
      <h2 className="text-2xl md:text-3xl font-bold text-neon-glow font-doto">Quiz Review</h2>
       <p className="mb-10 text-2xl font-extrabold text-neon-glow animate-pulse font-doto">
        Final Score: {playerScore}/{questions.length}
      </p>
      {questions.map((q, i) => {
        const userAnswer = selectedAnswers[i];
        const isCorrect = userAnswer === q.correct_index;

        return (
          <div
            key={i}
            className="glassmorphism p-2 md:p-4 rounded-2xl shadow-neon flex flex-col gap-2 w-full"
          >
            <p className="text-lg font-semibold text-white drop-shadow-neon">
              {i + 1}. {q.question}
            </p>

            <p
              className={`text-sm font-bold ${
                isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              Your Answer:{" "}
              {userAnswer !== undefined ? q.options[userAnswer] : "No Answer"}{" "}
              {isCorrect ? "✅" : "❌"}
            </p>

            {!isCorrect && userAnswer !== undefined && (
              <p className="text-sm text-green-300">
                Correct Answer: {q.options[q.correct_index]}
              </p>
            )}

            {q.explanation && (
              <p className="text-sm text-yellow-300">
                Explanation: {q.explanation}
              </p>
            )}
          </div>
        );
      })}
     
    </div>
  );
};

export default FinalResult;
