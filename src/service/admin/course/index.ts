import mongoose, { Types } from "mongoose";
import { ICourseService } from "./interface";
import { Course } from "../../../models/course";
import { title } from "process";
import { Course_Level } from "../../../models/course_level";
import fileService from "../../file/file";

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
};

export default courseService;
