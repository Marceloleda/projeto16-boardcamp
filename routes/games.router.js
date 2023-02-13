import { Router } from "express";
import { games_get, games_post } from "../controllers/games.controller.js";
import { validateGame } from "../middlewares/validateGame.middleware.js";

const router = Router();

router.get("/games", games_get)
router.post("/games", validateGame,games_post)


export default router;