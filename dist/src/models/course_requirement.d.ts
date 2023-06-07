import mongoose from "mongoose";
export interface ICourse_Requirement extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    content: string;
    courseId: mongoose.Types.ObjectId;
    saveAsync(): any;
    removeAsync(): any;
}
export interface ICourse_RequirementModel extends mongoose.Model<ICourse_Requirement> {
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
declare const model: ICourse_RequirementModel;
export { model as Course_Requirement };
