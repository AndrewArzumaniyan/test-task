import React, { useState, useEffect } from 'react';

import Timer from './components/Timer';
import QuestionCard from './components/QuestionCard';
import Statistics from './components/Statistics';
import StartButton from './components/StartButton';

import axios from 'axios';
import "./App.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  correctCount: number;
  totalCount: number;
}

function App() {
  const [start, setStart] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [stat, setStat] = useState<number[] | null>(null);
  const [timer, setTimer] = useState<number>(30);

  // Получение вопросов при загрузке компонента
  useEffect(() => {
    axios.get('http://localhost:5000/api/questions').then(response => {
      setQuestions(response.data);
    });
  }, []);

  const startTest = () => {
    setStart(true);
    setTimer(30);
  }

  // Запуск таймера при начале теста
  const startTimer = () => {
    return setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000); // Каждую секунду
  };

  // Завершение теста и отправка ответов на сервер
  const stopTest = () => {
    setStart(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setTimer(0); // Сбросить таймер
    axios.post('http://localhost:5000/api/answers', {}).then(response => {
      setStat(response.data.stat);
    });
  };

  // Обработка выбора варианта ответа
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  // Отправка ответа на сервер и переход к следующему вопросу
  const handleSubmit = () => {
    if (selectedOption !== null) {
      axios
        .post(`http://localhost:5000/api/answer/${question.id}`, { answer: selectedOption })
        .then(response => {
          if (response.data.isCorrect) {
            alert('Правильно!');
          } else {
            alert('Вы ошиблись!');
          }
          if (currentQuestion === questions.length - 1) {
            stopTest();
          } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
          }
        })
        .catch(error => {
          console.error('Error submitting answer:', error);
        });
    }
  };

  const onFinishTimer = () => {
    stopTest();
  };

  // Эффект для управления таймером
  useEffect(() => {
    if (start && timer > 0) {
      const interval = startTimer();
      return () => clearInterval(interval); // Остановка таймера при размонтировании
    }
    if (timer === 0) {
      stopTest(); // Вызов функции stopTest по истечении таймера
    }
  }, [start, timer]);

  // Проверка на готовность вопросов
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  // Получение текущего вопроса
  const question = questions[currentQuestion];

  // Отображение компонента
  return (
    <div className="App">
      {start ? (
        <div>
          <Timer timer={timer} onFinish={onFinishTimer} />
          <QuestionCard
            question={question}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
          />
          <button onClick={handleSubmit}>Ответить</button>
          <button onClick={stopTest}>Закончить тест</button>
        </div>
      ) : (
        <div>
          <Statistics stat={stat} />
          <StartButton onStart={startTest} />
        </div>
      )}
    </div>
  );
}

export default App;
