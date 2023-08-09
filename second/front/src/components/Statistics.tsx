import React from 'react';

interface StatisticsProps {
  stat: number[] | null;
}

const Statistics: React.FC<StatisticsProps> = ({ stat }) => {
  return (
    <div>
      {stat && (
        <div>
          <h2>Статистика:</h2>
          <ul>
            {stat && stat.map((el, index) => (
              <li key={index}>
                {Math.round(el * 100)}% людей ответили верно на {index + 1} вопрос
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Statistics;
