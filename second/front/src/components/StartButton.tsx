import React from 'react';

interface StartButtonProps {
  onStart: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button className='btn-start' onClick={onStart}>
      Начать тест
    </button>
  );
}

export default StartButton;
