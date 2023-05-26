import * as express from "express";
import stepController from "../../../controller/api/admin/step";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    stepController.position
  );

router
  .route("/:id")
  .put(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    stepController.update
  )
  .delete(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    stepController.delete
  );

router
  .route("/")
  .post(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    stepController.create
  );
export default router;
