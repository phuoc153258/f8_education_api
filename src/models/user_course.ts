import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const User_CourseSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  indexVideo: {
    type: Number,
    require: true,
  },
  lessonCompleted: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        require: true,
        unique: true,
      },
      stepId: {
        type: mongoose.Types.ObjectId,
        require: true,
        unique: true,
      },
    },
  ],
});

export interface IUser_Course extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  indexVideo: number;
  lessonCompleted: Array<any>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IUser_CourseModel extends mongoose.Model<IUser_Course> {
  aggregatePaginateCustom(
    aggregates: mongoose.Aggregate<any[]>,
    arg1: { page: number; limit: number }
  ): any;
  get(_id: string): Promise<any>;
  list({
    skip,
    limit,
    is_paginate,
    search,
  }?: {
    skip?: number;
    limit?: number;
    is_paginate: boolean;
    search: string;
  }): Promise<any>;
  execAsync(): Promise<any>;
}

User_CourseSchema.plugin(slug);
User_CourseSchema.plugin(paginate);
User_CourseSchema.plugin(aggregatePaginate);

User_CourseSchema.index({
  userId: "text",
});

const model = mongoose.model<IUser_Course, IUser_CourseModel>(
  "User_Course",
  User_CourseSchema
);
export { model as User_Course };
