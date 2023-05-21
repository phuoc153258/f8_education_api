import { BaseSuccesMessage } from "../../../messages/success/base";
import requirementService from "../../../service/admin/requirement";

const requirementController = {
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const requirementResponse = await requirementService.update(id, req.body);
      return res.success(BaseSuccesMessage.SUCCESS, requirementResponse);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const requirementResponse = await requirementService.delete(id);
      return res.success(BaseSuccesMessage.SUCCESS, requirementResponse);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const requirementResponse = await requirementService.create(req.body);
      return res.success(BaseSuccesMessage.SUCCESS, requirementResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default requirementController;
