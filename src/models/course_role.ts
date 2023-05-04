import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const Course_RoleSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "learning_path_1.png",
    },
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      slug: "name",
      slug_padding_size: 4,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: new Date(),
    },
    courses: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          require: true,
          unique: true,
        },
        courseId: {
          type: mongoose.Types.ObjectId,
          require: true,
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface ICourse_Role extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  description: string;
  image: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  deletedAt: Date;
  courses: Array<any>;
  // group_course_roles: Array<any>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICourse_RoleModel extends mongoose.Model<ICourse_Role> {
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

Course_RoleSchema.plugin(slug);
Course_RoleSchema.plugin(paginate);
Course_RoleSchema.plugin(aggregatePaginate);

// Course_RoleSchema.index({
//   name: "text",
// });

const model = mongoose.model<ICourse_Role, ICourse_RoleModel>(
  "Course_Role",
  Course_RoleSchema
);
export { model as Course_Role };
