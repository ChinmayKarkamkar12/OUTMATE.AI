import { Router } from "express";
import { enrichHandler } from "../controllers/enrich.controller";
import { validatePrompt } from "../middlewares/validatePrompt";

const router = Router();

router.post("/", validatePrompt, enrichHandler);

export default router;