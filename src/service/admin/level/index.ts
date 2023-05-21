import mongoose, { Types } from "mongoose";
import { Course_Level } from "../../../models/course_level";

const levelService: any = {
  list: async () => {
    try {
      return Course_Level.find({}).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id: any, level: any) => {
    try {
      return "dsa";
      // return Course_Level.find({}).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default levelService;
