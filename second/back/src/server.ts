import express from 'express';
import { answerRouter } from './routes/answer-rout';
import { questionRouter } from './routes/question-rout';

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

app.use(answerRouter);
app.use(questionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
