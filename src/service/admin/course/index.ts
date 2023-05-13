import mongoose, { Types } from "mongoose";
import { ICourseService } from "./interface";
import { Course } from "../../../models/course";
import { title } from "process";
import { Course_Level } from "../../../models/course_level";
import fileService from "../../file/file";
import { Track } from "../../../models/track";
import { Course_Will_Learn } from "../../../models/course_will_learn";
import { Course_Requirement } from "../../../models/course_requirement";

const courseService: ICourseService = {
  list: async () => {
    try {
      return Course.find({}).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async (body: any, files: any) => {
    try {
      const courseFound = await Course.findOne({
        title: body.title,
      });
      if (courseFound) {
        throw new Error("Khóa học này đã tồn tại!");
      }

      let course = new Course();

      if (body.title) course.title = body.title;

      if (body.description) course.description = body.description;

      const level = await Course_Level.findOne({ _id: body.levelId }).exec();
      if (!level) throw new Error("Cấp độ không tồn tại");
      course.levelId = level._id;

      if (files) {
        const response = await fileService.upload(files);
        if (response.image) course.image = response.image;
        if (response.icon) course.icon = response.icon;
      }

      if (body.isPro) course.isPro = body.isPro;

      if (body.price) course.price = body.price;

      course.isPublished = false;

      const courseSave = await course.save();

      return Promise.resolve(courseSave);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  delete: async (id: any) => {
    try {
      const response = await Course.findOneAndDelete({
        _id: mongoose.Types.ObjectId(id),
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  detail: async (id: any) => {
    try {
      const course = await Course.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
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
        {
          $sort: {
            "track.position": 1,
            "steps.position": 1,
          },
        },
      ]);

      courseTemp.tracks = tracks;

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
};

export default courseService;
