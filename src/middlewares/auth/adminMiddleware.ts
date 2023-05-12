import env from "../../../config/env";
import { User_Role } from "../../models/user_role";
import tokenService from "../../service/token";
import mongoose from "mongoose";

const adminMiddleware = {
  isAdmin: async (req, res, next) => {
    try {
      const role = await User_Role.findOne({
        _id: mongoose.Types.ObjectId(req.user.roleId),
      });
      if (role.level !== 2)
        return res.errors("Bạn không đủ quyền để truy cập", 400);
      next();
    } catch (error) {
      if (error.message == "jwt expired") {
        res.errors("Yêu cầu đăng nhập.", 401);
      }
      next(error);
    }
  },
};

export default adminMiddleware;
