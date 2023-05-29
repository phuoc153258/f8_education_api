import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const Course_LevelSchema = new Schema(
  {
    level: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export interface ICourse_Level extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  level: number;
  name: string;
  isDeleted: boolean;
  deletedAt: Date;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICourse_LevelModel extends mongoose.Model<ICourse_Level> {
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

Course_LevelSchema.plugin(slug);
Course_LevelSchema.plugin(paginate);
Course_LevelSchema.plugin(aggregatePaginate);

// Course_LevelSchema.index({
//   name: "text",
// });

const model = mongoose.model<ICourse_Level, ICourse_LevelModel>(
  "Course_Level",
  Course_LevelSchema
);
export { model as Course_Level };
