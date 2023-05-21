import mongoose, { Types } from "mongoose";
import { Course } from "../../../models/course";
import { Course_Will_Learn } from "../../../models/course_will_learn";
import courseService from "../course";

const willLearnService: any = {
  update: async (id: any, willLearn: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(willLearn.courseId),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      const willLearnModel = await Course_Will_Learn.findOne({
        _id: mongoose.Types.ObjectId(id),
      });

      if (willLearn.content) willLearnModel.content = willLearn.content;

      await willLearnModel.save();

      return await courseService.detail(willLearnModel.courseId);
      // return Course_Level.find({}).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id: any) => {
    try {
      const response = await Course_Will_Learn.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      await response.delete();
      const courseResponse = await courseService.detail(response.courseId);
      return courseResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async (willLearn: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(willLearn.courseId),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      let willLearnModel = new Course_Will_Learn();

      willLearnModel.courseId = courseModel._id;

      if (!willLearn.content)
        return Promise.reject(new Error("Nội dung không được trống !!!"));
      willLearnModel.content = willLearn.content;

      await willLearnModel.save();

      const courseResponse = await courseService.detail(willLearn.courseId);
      return courseResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default willLearnService;
