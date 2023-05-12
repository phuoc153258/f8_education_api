import mongoose, { Types } from "mongoose";
import { AVATAR_DEFAULT } from "../constants/user";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    roleId: {
      type: mongoose.Types.ObjectId,
      default: "645cb1503d269c7001631c3d",
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
    facebook_link: {
      type: String,
      default: "",
    },
    instagram_link: {
      type: String,
      default: "",
    },
    linkedin_link: {
      type: String,
      default: "",
    },
    twitter_link: {
      type: String,
      default: "",
    },
    youtube_link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

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
  facebook_link: string;
  instagram_link: string;
  linkedin_link: string;
  twitter_link: string;
  youtube_link: string;

  createdAt: any;
  updatedAt: any;
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

// UserSchema.index({
//   fullname: "text",
//   slug: "text",
//   email: "text",
// });

const model = mongoose.model<IUser, IUserModel>("User", UserSchema);
export { model as User };
