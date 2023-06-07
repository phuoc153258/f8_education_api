import mongoose, { Types } from "mongoose";
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
    aggregatePaginateCustom(aggregates: mongoose.Aggregate<any[]>, arg1: {
        page: number;
        limit: number;
    }): any;
    get(_id: string): Promise<any>;
    list({ skip, limit, is_paginate, search, }?: {
        skip?: number;
        limit?: number;
        is_paginate: boolean;
        search: string;
    }): Promise<any>;
    execAsync(): Promise<any>;
}
declare const model: ITrackModel;
export { model as Track };
