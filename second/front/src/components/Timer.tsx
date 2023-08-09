import React, { useState, useEffect } from 'react';

interface TimerProps {
  timer: number;
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ timer, onFinish }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        onFinish();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onFinish]);

  return <div className="timer">Таймер: {timer}</div>;
}

export default Timer;
