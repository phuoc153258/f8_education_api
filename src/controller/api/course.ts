import { BaseSuccesMessage } from "../../messages/success/base";
import courseService from "../../service/course";

const courseController = {
  combined: async (req, res, next) => {
    try {
      const { user } = req;
      const courseResponse = await courseService.combined(user, false);
      const courseResponsePro = await courseService.combined(user, true);
      return res.success(BaseSuccesMessage.SUCCESS, {
        freeCourses: courseResponse,
        proCourses: courseResponsePro,
      });
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

      const courseResponse = await courseService.steps(user, slug);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  stepDetail: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug, id } = req.params;
      const courseResponse = await courseService.stepsDetail(user, slug, id);
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  registerCourse: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const courseResponse = await courseService.registerCourse(
        user,
        slug,
        false
      );
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
  completedLesson: async (req, res, next) => {
    try {
      const { user } = req;
      const { slug } = req.params;
      const { stepId } = req.body;
      const courseResponse = await courseService.completedLesson(
        user,
        slug,
        stepId
      );
      return res.success(BaseSuccesMessage.SUCCESS, courseResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default courseController;
