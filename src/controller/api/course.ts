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
  analytics: async (req, res, next) => {
    try {
      const courseResponse = await courseService.analytics();
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  courseDetail: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const courseResponse = await courseService.courseDetail(user, slug);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  tracks: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const courseResponse = await courseService.tracks(user, slug);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  steps: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const courseResponse = await courseService.tracks(user, slug);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  stepDetail: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const courseResponse = await courseService.tracks(user, slug);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default courseController;
