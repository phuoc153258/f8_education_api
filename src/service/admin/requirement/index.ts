import mongoose, { Types } from "mongoose";
import { Course } from "../../../models/course";
import { Course_Will_Learn } from "../../../models/course_will_learn";
import courseService from "../course";
import { Course_Requirement } from "../../../models/course_requirement";

const requirementService: any = {
  update: async (id: any, requirement: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(requirement.courseId),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      const requirementModel = await Course_Requirement.findOne({
        _id: mongoose.Types.ObjectId(id),
      });

      if (requirement.content) requirementModel.content = requirement.content;

      await requirementModel.save();

      return await courseService.detail(requirementModel.courseId);
      // return Course_Level.find({}).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id: any) => {
    try {
      const response = await Course_Requirement.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      await response.delete();
      const courseResponse = await courseService.detail(response.courseId);
      return courseResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async (requirement: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(requirement.courseId),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      let requirementModel = new Course_Requirement();

      requirementModel.courseId = courseModel._id;

      if (!requirement.content)
        return Promise.reject(new Error("Nội dung không được trống !!!"));
      requirementModel.content = requirement.content;

      await requirementModel.save();

      const courseResponse = await courseService.detail(requirement.courseId);
      return courseResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default requirementService;
