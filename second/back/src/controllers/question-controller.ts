import jsonfile from 'jsonfile';
import path from 'path';
import { Request, Response } from 'express';

const questionsPath = path.join(__dirname, '../questions.json');

class Question {
  getQuestions(req: Request, res: Response) {
    jsonfile.readFile(questionsPath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading questions data' });
      } else {
        res.status(200).json(data);
      }
    });
  }
};

const question = new Question();

export default question;