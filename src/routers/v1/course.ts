import * as express from "express";
import courseController from "../../controller/api/course";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router({ mergeParams: true });

router
  .route("/combined")
  .get(authMiddleWare.isLogin, courseController.combined);

router.route("/analytics").get(courseController.analytics);

router
  .route("/:slug")
  .get(authMiddleWare.requireLogin, courseController.courseDetail);

export default router;
