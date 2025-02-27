import { Router } from "express";

import { userRouter } from "../routes/userRouter.js";
import { contentRouter } from "../routes/contentRouter.js";
import { formRouter } from "../routes/formRouter.js";
import { typeRouter } from "../routes/typeRouter.js";

const router = new Router();

router.use("/form", formRouter);
router.use("/content", contentRouter);
router.use("/user", userRouter);
router.use("/type", typeRouter);

export default router;