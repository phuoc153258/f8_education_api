import mongoose, { Types } from "mongoose";
import { AVATAR_DEFAULT } from "../constants/user";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: AVATAR_DEFAULT,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    default: "",
  },
  type_account: {
    type: String,
    default: "default",
  },
  role: {
    type: mongoose.Types.ObjectId,
    default: "63664c2a0ec8388637abd10b",
  },
  slug: {
    type: String,
    slug: "fullname",
    slug_padding_size: 4,
    unique: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    default: "",
  },
  facebook_id: {
    type: String,
    default: "",
  },
  google_id: {
    type: String,
    default: "",
  },
  github_id: {
    type: String,
    default: "",
  },
});

export interface IUser extends mongoose.Document {
  _id: Types.ObjectId;
  avatar: string;
  email: string;
  email_verified: boolean;
  is_active: boolean;
  password: string;
  phone: string;
  type_account: string;
  role: Types.ObjectId;
  slug: string;
  fullname: string;
  bio: string;
  facebook_id: string;
  google_id: string;
  github_id: string;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IUserModel extends mongoose.Model<IUser> {
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

UserSchema.plugin(slug);
UserSchema.plugin(paginate);
UserSchema.plugin(aggregatePaginate);

UserSchema.index({
  fullname: "text",
  slug: "text",
  email: "text",
});

const model = mongoose.model<IUser, IUserModel>("User", UserSchema);
export { model as User };
