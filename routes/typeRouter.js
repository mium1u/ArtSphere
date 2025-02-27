import { Router } from "express";
import { Controller as typeController } from "../controllers/typeController.js";
import checkRoleMiddleware from "../JS/middleware/checkRoleMiddleware.js";

const router = new Router();


router.post("/", checkRoleMiddleware(["admin"]), typeController.create);
router.get("/", typeController.getAll);
router.get("/:id", typeController.getOne);



export { router as typeRouter };