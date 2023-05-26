import mongoose, { Types } from "mongoose";
import slug from "mongoose-slug-generator";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const StepSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    trackId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Track",
    },
    position: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      default: `<p>Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem F8 sắp có gì mới nhé!</p> <ul> <li>Fanpage: <a href="https://www.facebook.com/f8vnofficial" target="_blank" rel="noreferrer">https://www.facebook.com/f8vnofficial</a></li> <li>Group: <a href="https://www.facebook.com/groups/649972919142215" target="_blank" rel="noreferrer">https://www.facebook.com/groups/649972919142215</a></li> <li>Youtube: <a href="/external-url?continue=https%3A%2F%2Fwww.youtube.com%2FF8VNOfficial" target="_blank" rel="noreferrer">https://www.youtube.com/F8VNOfficial</a></li> <li>Sơn Đặng: <a href="/external-url?continue=https%3A%2F%2Fwww.facebook.com%2Fsondnf8" target="_blank" rel="noreferrer">https://www.facebook.com/sondnf8</a></li> </ul>`,
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

export interface IStep extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  duration: number;
  trackId: Types.ObjectId;
  imageUrl: string;
  videoUrl: string;
  position: number;
  description: string;
  isDeleted: boolean;
  deletedAt: Date;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  saveAsync(): any;
  removeAsync(): any;
}

export interface IStepModel extends mongoose.Model<IStep> {
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

StepSchema.plugin(slug);
StepSchema.plugin(paginate);
StepSchema.plugin(aggregatePaginate);

// StepSchema.index({
//   title: "text",
// });

const model = mongoose.model<IStep, IStepModel>("Step", StepSchema);
export { model as Step };
