import React from "react";

const FinalResult = ({ questions, selectedAnswers, playerScore }) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <h2 className="text-3xl font-bold mb-4 text-neon-glow">Quiz Review</h2>
      {questions.map((q, i) => {
        const userAnswer = selectedAnswers[i];
        const isCorrect = userAnswer === q.correct_index;

        return (
          <div
            key={i}
            className="glassmorphism p-4 rounded-2xl shadow-neon min-w-[400px] flex flex-col gap-2"
          >
            <p className="text-lg font-semibold text-white drop-shadow-neon">
              {i + 1}. {q.question}
            </p>

            <p className={`text-sm ${isCorrect ? "text-green-400" : "text-red-400"} font-bold`}>
              Your Answer: {userAnswer !== undefined ? q.options[userAnswer] : "No Answer"} 
              {isCorrect ? " ✅" : " ❌"}
            </p>

            {!isCorrect && (
              <p className="text-sm text-green-300">
                Correct Answer: {q.options[q.correct_index]}
              </p>
            )}

            {q.explanation && (
              <p className="text-sm text-yellow-300">Explanation: {q.explanation}</p>
            )}
          </div>
        );
      })}

      <p className="mt-6 text-2xl font-extrabold text-neon-glow animate-pulse">
        Final Score: {playerScore}/{questions.length}
      </p>
    </div>
  );
};

export default FinalResult;
