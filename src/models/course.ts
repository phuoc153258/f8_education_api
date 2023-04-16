import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      slug: "title",
      slug_padding_size: 4,
      unique: true,
    },
    image: {
      type: String,
      default: "course_image_1.png",
    },
    icon: {
      type: String,
      default: "course_icon_1.png",
    },
    studentCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: new Date(),
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: new Date(),
    },
    levelId: {
      type: mongoose.Types.ObjectId,
      default: "6368c48e06944445dfaf62c4",
    },
    tracks: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          default: new mongoose.Types.ObjectId(),
        },
        title: String,
        position: Number,
        isPublished: { type: Boolean, default: true },
        publishedAt: { type: Date, default: new Date() },
        steps: [
          {
            id: {
              type: mongoose.Types.ObjectId,
              default: new mongoose.Types.ObjectId(),
            },
            title: String,
            duration: Number,
            imageUrl: String,
            videoUrl: String,
            position: Number,
            isPublished: { type: Date, default: new Date() },
            publishedAt: { type: Date, default: new Date() },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface ICourse extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  slug: string;
  image: string;
  icon: string;
  studentCount: number;
  isDeleted: boolean;
  deletedAt: Date;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  levelId: Types.ObjectId;
  tracks: [
    {
      id: mongoose.Types.ObjectId;
      title: string;
      position: number;
      isPublished: boolean;
      publishedAt: Date;
      steps: [
        {
          id: mongoose.Types.ObjectId;
          title: string;
          duration: number;
          imageUrl: string;
          videoUrl: string;
          position: number;
          isPublished: boolean;
          publishedAt: Date;
        }
      ];
    }
  ];
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICourseModel extends mongoose.Model<ICourse> {
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

CourseSchema.plugin(slug);
CourseSchema.plugin(paginate);
CourseSchema.plugin(aggregatePaginate);

CourseSchema.index({
  title: "text",
});

const model = mongoose.model<ICourse, ICourseModel>("Course", CourseSchema);
export { model as Course };
