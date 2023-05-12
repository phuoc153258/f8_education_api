import { BaseSuccesMessage } from "../../../messages/success/base";
import courseService from "../../../service/admin/course/index";

const courseController = {
  list: async (req, res, next) => {
    try {
      const courseResponsePro = await courseService.list();
      return res.success(BaseSuccesMessage.SUCCESS, courseResponsePro);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const courseResponsePro = await courseService.create(req.body, req.files);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponsePro);
    } catch (error) {
      next(error);
    }
  },
};

export default courseController;
