import React from "react";

const QuizQuestion = ({ questionData, index, selectedAnswer, handleAnswerSelect }) => {
  const isAnswered = selectedAnswer !== undefined;

  return (
    <div className="glassmorphism p-6 rounded-2xl shadow-neon w-[300px] md:w-auto flex flex-col gap-5">
      <p className="text-xl font-semibold text-white drop-shadow-neon">
        {index + 1}. {questionData.question}
      </p>

      <div className="flex flex-col gap-3">
        {questionData.options.map((option, i) => {
          const isCorrect = questionData.correct_index === i;
          const isSelected = selectedAnswer === i;

          let btnClass = "btn-neon";
          if (isAnswered) {
            if (isCorrect) btnClass = "btn-correct";
            else if (isSelected) btnClass = "btn-wrong";
            else btnClass = "btn-disabled";
          }

          return (
            <button
              key={i}
              className={btnClass}
              onClick={() => !isAnswered && handleAnswerSelect(index, i)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
