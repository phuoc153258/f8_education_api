import mongoose, { Types } from "mongoose";
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
    isPro: boolean;
    price: number;
    saveAsync(): any;
    removeAsync(): any;
}
export interface ICourseModel extends mongoose.Model<ICourse> {
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
declare const model: ICourseModel;
export { model as Course };
