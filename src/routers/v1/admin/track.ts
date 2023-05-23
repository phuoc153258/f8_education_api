import * as express from "express";
import trackController from "../../../controller/api/admin/track";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/:id/position")
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    trackController.position
  );

router
  .route("/:id")
  .put(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    trackController.update
  )
  .delete(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    trackController.delete
  );

router
  .route("/")
  .post(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    trackController.create
  );
export default router;
