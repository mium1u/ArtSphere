import { Router } from "express";
import { Controller as formController } from "../controllers/formController.js";
import checkRoleMiddleware from "../JS/middleware/checkRoleMiddleware.js";
import authMiddleware from "../JS/middleware/authMiddleware.js"; // Импортируем middleware аутентификации

const router = new Router();

router.post("/", authMiddleware, formController.create);
router.get("/", checkRoleMiddleware(["admin"]), formController.getAll);
router.get("/:id", checkRoleMiddleware(["admin"]), formController.getOne);
router.patch("/:id",checkRoleMiddleware(["admin"]), formController.accept);
router.patch("/:id",checkRoleMiddleware(["admin"]), formController.decline);

export { router as formRouter };