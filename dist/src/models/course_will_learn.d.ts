import mongoose from "mongoose";
export interface ICourse_Will_Learn extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    content: string;
    courseId: mongoose.Types.ObjectId;
    saveAsync(): any;
    removeAsync(): any;
}
export interface ICourse_Will_LearnModel extends mongoose.Model<ICourse_Will_Learn> {
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
declare const model: ICourse_Will_LearnModel;
export { model as Course_Will_Learn };
