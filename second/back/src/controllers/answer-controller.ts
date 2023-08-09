import jsonfile from 'jsonfile';
import path from 'path';
import { Request, Response } from 'express';

interface Question {
  id: number;
  question: string,
  options: string[],
  correctOption: number,
  correctCount: number,
  totalCount: number,
}

const questionsPath = path.join(__dirname, '../questions.json');

class Answer {
  postAnswers(req: Request, res: Response) {
    jsonfile.readFile(questionsPath, (err, questions) => {
      if (err) {
        console.error('Error reading questions file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      let stat: number[] = [];
      
      for (const question of questions) {
        stat.push(question.correctCount / question.totalCount);
      }
  
      res.json({ message: 'Statistics is ready', stat });
    });
  }

  postAnswer(req: Request, res: Response) {
    const id = parseInt(req.params.id); // Получаем id из параметров маршрута
    const answer = req.body.answer; // Получаем ответ из тела запроса
    let isCorrect = false;

    jsonfile.readFile(questionsPath, (err, questions) => {
      if (err) {
        console.error('Error reading questions file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const questionToUpdate = questions.find((q : Question) => q.id === id);
      if (!questionToUpdate) {
        return res.status(404).json({ error: 'Question not found' });
      }

      questionToUpdate.totalCount++; // Изменяем ответ в вопросе

      if (answer === questionToUpdate.correctOption) {
        isCorrect = true;
        questionToUpdate.correctCount++;
      }

      jsonfile.writeFile(questionsPath, questions, { spaces: 2 }, err => {
        if (err) {
          console.error('Error writing to questions file:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ message: 'Answer updated successfully', isCorrect });
      });
    });
  }
};

const answer = new Answer;

export default answer;