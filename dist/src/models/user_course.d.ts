import mongoose from "mongoose";
export interface IUser_Course extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    indexVideo: number;
    lessonCompleted: Array<any>;
    saveAsync(): any;
    removeAsync(): any;
}
export interface IUser_CourseModel extends mongoose.Model<IUser_Course> {
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
declare const model: IUser_CourseModel;
export { model as User_Course };
