import * as express from "express";
import PaymentController from "../../controller/api/payment";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router();

router
  .route("/zalo-pay/:slug")
  .get(authMiddleWare.requireLogin, PaymentController.payment);

router
  .route("/check/:slug")
  .get(authMiddleWare.requireLogin, PaymentController.checkPayment);

export default router;
