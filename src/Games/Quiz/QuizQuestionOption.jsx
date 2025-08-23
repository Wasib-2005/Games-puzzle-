import React from "react";

const QuizQuestionOption = ({
  option,
  isCorrect,
  isSelected,
  tempSelectedOption,
  isAnswered,
  onSelect
}) => {
  let btnClass = "btn-neon";

  if (tempSelectedOption) {
    btnClass = "btn-selected"; // optional extra state if you want
  } else if (isAnswered) {
    if (isCorrect) btnClass = "btn-correct";
    else if (isSelected) btnClass = "btn-wrong";
    else btnClass = "btn-disabled";
  }

  return (
    <button
      className={btnClass}
      onClick={() => !isAnswered && !tempSelectedOption && onSelect()}
      disabled={isAnswered || tempSelectedOption}
    >
      {option}
    </button>
  );
};

export default QuizQuestionOption;
