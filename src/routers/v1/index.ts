import * as express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import fileRouter from "./file";
import courseRouter from "./course";
import learningPathRouter from "./learningPath";
import paymentRouter from "./payment";
import courseAdminRouter from "./admin/course";
import levelAdminRouter from "./admin/level";
import willLearnRouter from "./admin/willLearn";
import requirementRouter from "./admin/requirement";
import trackRouter from "./admin/track";
import stepRouter from "./admin/step";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/file", fileRouter);
router.use("/course", courseRouter);
router.use("/learning-path", learningPathRouter);
router.use("/payment", paymentRouter);
router.use("/admin/course", courseAdminRouter);
router.use("/admin/level", levelAdminRouter);
router.use("/admin/willLearn", willLearnRouter);
router.use("/admin/requirement", requirementRouter);
router.use("/admin/track", trackRouter);
router.use("/admin/step", stepRouter);

export default router;
