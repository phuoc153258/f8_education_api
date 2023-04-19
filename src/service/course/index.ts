import mongoose, { Types } from "mongoose";
import { Course } from "../../models/course";
import { User_Course } from "../../models/user_course";
import { ICourseService } from "./interface";
import CombinedCourseResponseDTO from "../../dtos/response/course/CombinedCourseResponseDTO";
import { Course_Level } from "../../models/course_level";
import { Course_Requirement } from "../../models/course_requirement";
import { Course_Will_Learn } from "../../models/course_will_learn";
import CourseDetailResponseDTO from "../../dtos/response/course/CourseDetailResponseDTO";

const courseService: ICourseService = {
  combined: async (user: any) => {
    try {
      const courses = await Course.find().exec();
      const userCourses =
        user != undefined
          ? await User_Course.findOne({
              userId: new mongoose.Types.ObjectId(user._id),
            }).exec()
          : undefined;
      const newCourses = courses.map((course) =>
        new CombinedCourseResponseDTO().responseDTO(course, userCourses)
      );
      return Promise.resolve(newCourses);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  analytics: async () => {
    try {
      const courses = await Course.find({}).select("studentCount").exec();
      let studentCount = 0;
      courses.forEach((item) => {
        studentCount += item.studentCount;
      });
      Promise.resolve({
        courseCount: courses.length,
        studentCount,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  courseDetail: async (user, slug) => {
    try {
      const course = await Course.findOne({ slug: slug });
      if (!course) return Promise.reject(new Error("Course is not exits !!!"));

      const level = await Course_Level.findOne({ _id: course.levelId }).exec();
      const willLearns = await Course_Will_Learn.find({
        courseId: course._id,
      });
      const requirements = await Course_Requirement.find({
        courseId: course._id,
      });
      const userCourses = await User_Course.findOne({
        userId: new mongoose.Types.ObjectId(user._id),
      }).exec();
      const newCourse = new CourseDetailResponseDTO().responseDTO(
        course,
        userCourses,
        willLearns,
        requirements,
        level
      );
      return Promise.resolve(newCourse);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default courseService;
