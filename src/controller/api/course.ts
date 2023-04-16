import { BaseSuccesMessage } from "../../messages/success/base";
import courseService from "../../service/course";

const courseController = {
  combined: async (req, res, next) => {
    try {
      const { user } = req;
      const courseResponse = await courseService.combined(user);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default courseController;
