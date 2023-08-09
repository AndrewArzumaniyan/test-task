import { Router } from "express";
import question from "../controllers/question-controller";

const router = Router();

router.get("/api/questions", question.getQuestions);

export { router as questionRouter };