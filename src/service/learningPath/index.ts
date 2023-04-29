import mongoose, { Types } from "mongoose";
import { Course } from "../../models/course";
import { User_Course } from "../../models/user_course";
import { ILearningPathService } from "./interface";
import CombinedCourseResponseDTO from "../../dtos/response/course/CombinedCourseResponseDTO";
import { Course_Level } from "../../models/course_level";
import { Course_Requirement } from "../../models/course_requirement";
import { Course_Will_Learn } from "../../models/course_will_learn";
import CourseDetailResponseDTO from "../../dtos/response/course/CourseDetailResponseDTO";
import { Track } from "../../models/track";
import { Step } from "../../models/step";
import { User } from "../../models";
import { Course_Role } from "../../models/course_role";

const learningPathService: ILearningPathService = {
  list: async () => {
    try {
      const courseRoles = await Course_Role.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courses.courseId",
            foreignField: "_id",
            as: "courses",
          },
        },
      ]);
      return Promise.resolve(courseRoles);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default learningPathService;
