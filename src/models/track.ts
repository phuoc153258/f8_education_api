import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    position: {
      type: Number,
      require: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Course",
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
  },
  {
    timestamps: true,
  }
);

export interface ITrack extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  position: number;
  courseId: Types.ObjectId;
  isDeleted: boolean;
  deletedAt: Date;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  saveAsync(): any;
  removeAsync(): any;
}

export interface ITrackModel extends mongoose.Model<ITrack> {
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

TrackSchema.plugin(slug);
TrackSchema.plugin(paginate);
TrackSchema.plugin(aggregatePaginate);

// TrackSchema.index({
//   title: "text",
// });

const model = mongoose.model<ITrack, ITrackModel>("Track", TrackSchema);
export { model as Track };
