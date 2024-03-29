import * as express from "express";
import courseController from "../../../controller/api/admin/course";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .delete(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.delete
  )
  .put(
    fileUpload({ createParentPath: true }),
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.update
  )
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.detail
  );

router
  .route("/:id/position")
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.position
  );

router
  .route("/")
  .post(
    fileUpload({ createParentPath: true }),
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.create
  )
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    courseController.list
  );

export default router;
