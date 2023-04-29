import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const User_RoleSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    level: {
      type: Number,
      require: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IUser_Role extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  level: number;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  saveAsync(): any;
  removeAsync(): any;
}

export interface IUser_RoleModel extends mongoose.Model<IUser_Role> {
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

User_RoleSchema.plugin(slug);
User_RoleSchema.plugin(paginate);
User_RoleSchema.plugin(aggregatePaginate);

User_RoleSchema.index({
  name: "text",
});

const model = mongoose.model<IUser_Role, IUser_RoleModel>(
  "User_Role",
  User_RoleSchema
);
export { model as User_Role };
