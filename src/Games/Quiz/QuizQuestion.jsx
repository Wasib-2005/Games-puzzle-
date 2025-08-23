import React from "react";
import QuizQuestionOption from "./QuizQuestionOption";

const QuizQuestion = ({
  questionData,
  index,
  selectedAnswer,
  tempSelectedOption,
  handleAnswerSelect
}) => {
  const isAnswered = selectedAnswer !== undefined;

  return (
    <div className=" p-6 rounded-2xl  w-[320px] md:w-auto flex flex-col gap-5 min-w-[300px] md:min-w-[500px]">
      <p className="text-xl font-semibold text-white drop-shadow-neon">
        {index + 1}. {questionData.question}
      </p>

      <div className="flex flex-col gap-3 text-center justify-center items-center">
        {questionData.options.map((option, i) => (
          <QuizQuestionOption
            key={i}
            option={option}
            isCorrect={questionData.correct_index === i}
            isSelected={selectedAnswer === i}
            tempSelectedOption={tempSelectedOption === i}
            isAnswered={isAnswered}
            onSelect={() => handleAnswerSelect(index, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
