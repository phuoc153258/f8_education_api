import mongoose from "mongoose";
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
declare const model: ICourse_LevelModel;
export { model as Course_Level };
