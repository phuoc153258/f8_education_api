import { BaseSuccesMessage } from "../../../messages/success/base";
import trackService from "../../../service/admin/track";

const trackController = {
  position: async (req, res, next) => {
    try {
      const { id } = req.params;
      const trackResponse = await trackService.position(id);
      return res.success(BaseSuccesMessage.SUCCESS, trackResponse);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const trackResponse = await trackService.create(req.body);
      return res.success(BaseSuccesMessage.SUCCESS, trackResponse);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const trackResponse = await trackService.delete(id);
      return res.success(BaseSuccesMessage.SUCCESS, trackResponse);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const trackResponse = await trackService.update(id, req.body);
      return res.success(BaseSuccesMessage.SUCCESS, trackResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default trackController;
