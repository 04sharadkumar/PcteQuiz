import express from "express";
import { addQuestion, getQuestions } from "../controllers/placementEssentialController.js";

const router = express.Router();

router.post("/:tab/:subTab/:topic/question", addQuestion);

router.get("/:tab/:subTab/:topic/questions", getQuestions);

export default router;
