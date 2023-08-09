import React from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  correctCount: number;
  totalCount: number;
}

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  handleOptionSelect: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, handleOptionSelect }) => {
  return (
    <div>
      <h1>Тест</h1>
      <p>{question.question}</p>
      <ul>
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(index)}
            style={{
              backgroundColor: selectedOption === index ? '#ccc' : 'white',
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;
