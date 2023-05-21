import { BaseSuccesMessage } from "../../../messages/success/base";
import willLearnService from "../../../service/admin/willLearn";

const willLearnController = {
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const willLearnResponse = await willLearnService.update(id, req.body);
      return res.success(BaseSuccesMessage.SUCCESS, willLearnResponse);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const willLearnResponse = await willLearnService.delete(id);
      return res.success(BaseSuccesMessage.SUCCESS, willLearnResponse);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const willLearnResponse = await willLearnService.create(req.body);
      return res.success(BaseSuccesMessage.SUCCESS, willLearnResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default willLearnController;
