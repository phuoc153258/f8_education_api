import * as express from "express";
import learningPathController from "../../controller/api/learningPath";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router({ mergeParams: true });

router.route("/").get(authMiddleWare.isLogin, learningPathController.list);

export default router;
