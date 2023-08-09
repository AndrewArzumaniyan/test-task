import { Router } from "express";
import answer from "../controllers/answer-controller";

const router = Router();

router.post("/api/answers", answer.postAnswers);
router.post("/api/answer/:id", answer.postAnswer);

export { router as answerRouter };