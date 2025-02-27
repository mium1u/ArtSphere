import { Router } from "express";
import { Controller as contentController } from "../controllers/contentController.js";
import authMiddleware from "../JS/middleware/authMiddleware.js"; // Импортируем middleware аутентификации

const router = new Router();

router.get("/", contentController.getAll);
router.get("/:id", contentController.getOne);
router.get("/user/:username", authMiddleware, contentController.getByUsername); // Новый маршрут для получения постов пользователя

export { router as contentRouter };