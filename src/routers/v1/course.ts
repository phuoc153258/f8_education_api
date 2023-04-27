import * as express from "express";
import courseController from "../../controller/api/course";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router({ mergeParams: true });

router
  .route("/:slug/steps/:id")
  .get(authMiddleWare.requireLogin, courseController.stepDetail);

router
  .route("/:slug/steps")
  .get(authMiddleWare.requireLogin, courseController.steps);

router
  .route("/tracks/:slug")
  .get(authMiddleWare.requireLogin, courseController.tracks);

router
  .route("/combined")
  .get(authMiddleWare.isLogin, courseController.combined);

router.route("/analytics").get(courseController.analytics);

router
  .route("/:slug")
  .post(authMiddleWare.requireLogin, courseController.registerCourse)
  .get(authMiddleWare.requireLogin, courseController.courseDetail);

export default router;
