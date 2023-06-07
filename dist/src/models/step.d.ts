import mongoose, { Types } from "mongoose";
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
declare const model: IStepModel;
export { model as Step };
