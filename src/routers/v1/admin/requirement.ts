import * as express from "express";
import requirementController from "../../../controller/api/admin/requirement";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .put(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    requirementController.update
  )
  .delete(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    requirementController.delete
  );

router
  .route("/")
  .post(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    requirementController.create
  );
export default router;
