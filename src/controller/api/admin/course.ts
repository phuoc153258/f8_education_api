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
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const courseResponse = await courseService.delete(id);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  detail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const courseResponse = await courseService.detail(id);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const courseResponse = await courseService.update(
        id,
        req.body,
        req.files
      );
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  position: async (req, res, next) => {
    try {
      const { id } = req.params;
      const courseResponse = await courseService.position(id);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default courseController;
