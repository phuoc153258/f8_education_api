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
  show: async (user: any, slug: any) => {
    try {
      // const courseRole = await Course_Role.aggregate([
      //   {
      //     $match: {
      //       slug: slug,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "group_course_roles",
      //       localField: "_id",
      //       foreignField: "courseRoleId",
      //       as: "group_course_roles",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "courses",
      //       localField: "group_course_roles.courses.courseId",
      //       foreignField: "_id",
      //       as: "courses",
      //     },
      //   },
      // ]);
      let courseRole: any = await Course_Role.aggregate([
        {
          $limit: 1,
        },
        {
          $match: {
            slug: slug,
          },
        },
        {
          $lookup: {
            from: "group_course_roles",
            localField: "_id",
            foreignField: "courseRoleId",
            as: "group_course_roles",
          },
        },
      ]);
      const learningPathResponsePromise = courseRole[0].group_course_roles.map(
        async (item: any) => {
          let newItem = { ...item, courses: [] };
          const newCourses = item.courses.map(async (course: any) => {
            return await Course.findOne({
              _id: mongoose.Types.ObjectId(course.courseId),
            });
          });
          newItem.courses = await Promise.all(newCourses);
          return newItem;
        }
      );
      courseRole[0].group_course_roles = await Promise.all(
        learningPathResponsePromise
      );
      return Promise.resolve(courseRole[0]);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default learningPathService;
