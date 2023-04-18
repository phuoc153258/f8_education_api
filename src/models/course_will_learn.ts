import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const Course_Will_LearnSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
      unique: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface ICourse_Will_Learn extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  courseId: mongoose.Types.ObjectId;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICourse_Will_LearnModel
  extends mongoose.Model<ICourse_Will_Learn> {
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

Course_Will_LearnSchema.plugin(slug);
Course_Will_LearnSchema.plugin(paginate);
Course_Will_LearnSchema.plugin(aggregatePaginate);

Course_Will_LearnSchema.index({
  content: "text",
});

const model = mongoose.model<ICourse_Will_Learn, ICourse_Will_LearnModel>(
  "Course_Will_Learn",
  Course_Will_LearnSchema
);
export { model as Course_Will_Learn };
