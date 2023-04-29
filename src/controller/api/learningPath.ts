import { BaseSuccesMessage } from "../../messages/success/base";
import learningPathService from "../../service/learningPath";

const learningPathController = {
  list: async (req, res, next) => {
    try {
      const learningPathResponse = await learningPathService.list();
      return res.success(BaseSuccesMessage.SUCCESS, learningPathResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default learningPathController;
