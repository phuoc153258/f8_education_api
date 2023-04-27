import mongoose, { Types } from "mongoose";
import { Course } from "../../models/course";
import { User_Course } from "../../models/user_course";
import { ICourseService } from "./interface";
import CombinedCourseResponseDTO from "../../dtos/response/course/CombinedCourseResponseDTO";
import { Course_Level } from "../../models/course_level";
import { Course_Requirement } from "../../models/course_requirement";
import { Course_Will_Learn } from "../../models/course_will_learn";
import CourseDetailResponseDTO from "../../dtos/response/course/CourseDetailResponseDTO";
import { Track } from "../../models/track";
import { Step } from "../../models/step";
import { User } from "../../models";

const courseService: ICourseService = {
  combined: async (user: any) => {
    try {
      const courses = await Course.find({}).exec();
      if (!courses) return Promise.reject(new Error("Course is not exits !!!"));

      const newCoursesPromises = courses.map(async (item) => {
        let course = {
          image: item.image,
          icon: item.icon,
          studentCount: item.studentCount,
          isDeleted: item.isDeleted,
          deletedAt: item.deletedAt,
          isPublished: item.isPublished,
          publishedAt: item.publishedAt,
          levelId: item.levelId,
          _id: item._id,
          title: item.title,
          description: item.description,
          slug: item.slug,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          tracks: [],
          isRegister: false,
        };
        const tracks = await Track.aggregate([
          {
            $match: {
              courseId: item._id,
            },
          },
          {
            $lookup: {
              from: "steps",
              localField: "_id",
              foreignField: "trackId",
              as: "steps",
            },
          },
        ]);
        course.tracks = tracks;

        const userCourses = await User_Course.findOne({
          userId: new mongoose.Types.ObjectId(user._id),
          courseId: item._id,
        }).exec();
        if (userCourses !== null) course.isRegister = true;
        return course;
      });
      const newCourses = await Promise.all(newCoursesPromises);

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
      return { courseCount: courses.length, studentCount };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  courseDetail: async (user, slug) => {
    try {
      const course = await Course.findOne({ slug: slug });
      if (!course) return Promise.reject(new Error("Course is not exits !!!"));

      let courseTemp = {
        image: course.image,
        icon: course.icon,
        studentCount: course.studentCount,
        isDeleted: course.isDeleted,
        deletedAt: course.deletedAt,
        isPublished: course.isPublished,
        publishedAt: course.publishedAt,
        levelId: course.levelId,
        _id: course._id,
        title: course.title,
        description: course.description,
        slug: course.slug,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        tracks: [],
        isRegister: false,
        level: null,
        willLearns: [],
        requirements: [],
      };
      const tracks = await Track.aggregate([
        {
          $match: {
            courseId: course._id,
          },
        },
        {
          $lookup: {
            from: "steps",
            localField: "_id",
            foreignField: "trackId",
            as: "steps",
          },
        },
      ]);
      courseTemp.tracks = tracks;

      const userCoursesTemp = await User_Course.findOne({
        userId: new mongoose.Types.ObjectId(user._id),
        courseId: course._id,
      }).exec();
      if (userCoursesTemp !== null) courseTemp.isRegister = true;

      courseTemp.level = await Course_Level.findOne({
        _id: course.levelId,
      }).exec();

      courseTemp.willLearns = await Course_Will_Learn.find({
        courseId: course._id,
      });
      courseTemp.requirements = await Course_Requirement.find({
        courseId: course._id,
      });
      return courseTemp;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  tracks: async (user, slug) => {
    try {
      const course = await Course.findOne({ slug: slug });
      if (!course) return Promise.reject(new Error("Course is not exits !!!"));

      let trackTemp = {
        tracks: [],
        isRegister: true,
        userProgress: [],
        trackStepCount: 0,
      };
      const tracks = await Track.aggregate([
        {
          $match: {
            courseId: course._id,
          },
        },
        {
          $lookup: {
            from: "steps",
            localField: "_id",
            foreignField: "trackId",
            as: "steps",
          },
        },
      ]);
      trackTemp.tracks = tracks;

      const userCourses = await User_Course.findOne({
        userId: new mongoose.Types.ObjectId(user._id),
        courseId: course._id,
      }).exec();
      if (!userCourses || userCourses === null) {
        const user_course = new User_Course({
          userId: mongoose.Types.ObjectId(user._id),
          courseId: course._id,
          indexVideo: 1,
          lessonCompleted: [],
        });
        await user_course.save();
        trackTemp.userProgress = [];
      } else {
        trackTemp.userProgress = userCourses.lessonCompleted;
      }

      tracks.forEach((track) => {
        track.steps.forEach((step) => {
          trackTemp.trackStepCount += 1;
        });
      });

      return Promise.resolve(trackTemp);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  steps: async (user, slug) => {
    // try {
    //   const course = await Course.findOne({ slug: slug });
    //   if (!course) return Promise.reject(new Error("Course is not exits !!!"));
    //   const userCourseTemp = await User_Course.findOne({
    //     userId: new mongoose.Types.ObjectId(user._id),
    //   }).exec();
    //   if (
    //     !userCourseTemp.detailCourses.find((x) =>
    //       new mongoose.Types.ObjectId(course._id).equals(
    //         new mongoose.Types.ObjectId(x.courseId)
    //       )
    //     )
    //   ) {
    //     const registCourse = {
    //       courseId: course._id,
    //       indexVideo: 1,
    //     };
    //     await User_Course.findOneAndUpdate(
    //       { userId: user._id },
    //       { $push: { detailCourses: registCourse } }
    //     );
    //   }
    //   await User_Course.updateOne(
    //     {
    //       userId: new mongoose.Types.ObjectId(user._id),
    //       "detailCourses.idCourse": course._id,
    //     },
    //     {
    //       $set: {
    //         "detailCourses.$.indexVideo": indexVideo,
    //       },
    //     }
    //   );
    //   const userCourse = await User_Course.findOne(
    //     {
    //       userId: new mongoose.Types.ObjectId(user._id),
    //       "detailCourses.courseId": new mongoose.Types.ObjectId(course._id),
    //     },
    //     { "detailCourses.$": 1 }
    //   );
    //   let continue_id = "";
    //   let next_id = "";
    //   let previous_id = "";
    //   let index = 0;
    //   let step = {};
    //   course.tracks.forEach((x) => {
    //     x.steps.forEach((y) => {
    //       if (userCourse.detailCourses[0].indexVideo == index - 1) {
    //         previous_id = y._id;
    //       }
    //       if (userCourse.detailCourses[0].indexVideo == index) {
    //         continue_id = y._id;
    //         step = y;
    //       }
    //       if (userCourse.detailCourses[0].indexVideo == index + 1) {
    //         next_id = y._id;
    //       }
    //       index++;
    //     });
    //   });
    //   course.tracks = null;
    //   return Promise.resolve({
    //     isRegister: true,
    //     course,
    //     continue_id,
    //     next_id,
    //     previous_id,
    //     userCourse,
    //     step,
    //   });
    // } catch (error) {
    //   return Promise.reject(error);
    // }
  },
  stepsDetail: async (user, slug, id) => {
    // try {
    //   const course = await Course.findOne({ slug: slug });
    //   if (!course) return Promise.reject(new Error("Course is not exits !!!"));
    //   const userCourseTemp = await User_Course.findOne({
    //     userId: new mongoose.Types.ObjectId(user._id),
    //   }).exec();
    //   if (
    //     !userCourseTemp.detailCourses.find((x) =>
    //       new mongoose.Types.ObjectId(course._id).equals(
    //         new mongoose.Types.ObjectId(x.courseId)
    //       )
    //     )
    //   ) {
    //     const registCourse = {
    //       courseId: course._id,
    //       indexVideo: 1,
    //     };
    //     await User_Course.findOneAndUpdate(
    //       { userId: user._id },
    //       { $push: { detailCourses: registCourse } }
    //     );
    //   }
    //   const userCourse = await User_Course.findOne(
    //     {
    //       userId: new mongoose.Types.ObjectId(user._id),
    //       "detailCourses.courseId": new mongoose.Types.ObjectId(course._id),
    //     },
    //     { "detailCourses.$": 1 }
    //   );
    //   let continue_id = "";
    //   let next_id = "";
    //   let previous_id = "";
    //   let index = 0;
    //   let step = {};
    //   course.tracks.forEach((x) => {
    //     x.steps.forEach((y) => {
    //       if (userCourse.detailCourses[0].indexVideo == index - 1) {
    //         previous_id = y._id;
    //       }
    //       if (userCourse.detailCourses[0].indexVideo == index) {
    //         continue_id = y._id;
    //         step = y;
    //       }
    //       if (userCourse.detailCourses[0].indexVideo == index + 1) {
    //         next_id = y._id;
    //       }
    //       index++;
    //     });
    //   });
    //   course.tracks = null;
    //   return Promise.resolve({
    //     isRegister: true,
    //     course,
    //     continue_id,
    //     next_id,
    //     previous_id,
    //     userCourse,
    //     step,
    //   });
    // } catch (error) {
    //   return Promise.reject(error);
    // }
  },
  registerCourse: async (user, slug) => {
    try {
      const course = await Course.findOne({ slug: slug }).exec();
      if (!course) return Promise.reject(new Error("Course is not exits !!!"));

      const userCourse = await User_Course.findOne({
        userId: new mongoose.Types.ObjectId(user._id),
        courseId: course._id,
      });
      if (!userCourse || userCourse === null) {
        const user_course = new User_Course({
          userId: mongoose.Types.ObjectId(user._id),
          courseId: course._id,
          indexVideo: 1,
          lessonCompleted: [],
        });
        await user_course.save();
        return Promise.resolve(user_course);
      } else return Promise.resolve(userCourse);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default courseService;
