import * as express from "express";
import levelController from "../../../controller/api/admin/level";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    levelController.list
  );

export default router;
