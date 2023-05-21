import * as express from "express";
import willLearnController from "../../../controller/api/admin/willLearn";
import authMiddleWare from "../../../middlewares/auth/authenMiddleWare";
import adminMiddleware from "../../../middlewares/auth/adminMiddleware";
import fileUpload from "express-fileupload";

const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .put(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    willLearnController.update
  )
  .delete(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    willLearnController.delete
  );

router
  .route("/")
  .post(
    authMiddleWare.requireLogin,
    adminMiddleware.isAdmin,
    willLearnController.create
  );
export default router;
