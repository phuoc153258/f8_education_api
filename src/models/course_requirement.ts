import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const Course_RequirementSchema = new Schema(
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

export interface ICourse_Requirement extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  courseId: mongoose.Types.ObjectId;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICourse_RequirementModel
  extends mongoose.Model<ICourse_Requirement> {
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

Course_RequirementSchema.plugin(slug);
Course_RequirementSchema.plugin(paginate);
Course_RequirementSchema.plugin(aggregatePaginate);

// Course_RequirementSchema.index({
//   content: "text",
// });

const model = mongoose.model<ICourse_Requirement, ICourse_RequirementModel>(
  "Course_Requirement",
  Course_RequirementSchema
);
export { model as Course_Requirement };
