import { BaseSuccesMessage } from "../../../messages/success/base";
import stepService from "../../../service/admin/step";

const stepController = {
  position: async (req, res, next) => {
    try {
      const { id } = req.params;
      const stepResponse = await stepService.position(id);
      return res.success(BaseSuccesMessage.SUCCESS, stepResponse);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const stepResponse = await stepService.create(req.body);
      return res.success(BaseSuccesMessage.SUCCESS, stepResponse);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const stepResponse = await stepService.delete(id);
      return res.success(BaseSuccesMessage.SUCCESS, stepResponse);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const stepResponse = await stepService.update(id, req.body);
      return res.success(BaseSuccesMessage.SUCCESS, stepResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default stepController;
