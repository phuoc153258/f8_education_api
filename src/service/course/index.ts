import mongoose from "mongoose";
import { Course } from "../../models/course";
import { User_Course } from "../../models/user_course";
import { ICourseService } from "./interface";
import CombinedCourseResponseDTO from "../../dtos/response/course/CombinedCourseResponseDTO";

const courseService: ICourseService = {
  combined: async (user: any) => {
    const courses = await Course.find().exec();
    const userCourses = await User_Course.findOne({
      userId: new mongoose.Types.ObjectId(user._id),
    }).exec();
    const newCourses = courses.map((course) =>
      new CombinedCourseResponseDTO().responseDTO(course, userCourses)
    );
    return newCourses;
  },
};

export default courseService;
