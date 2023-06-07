import mongoose from "mongoose";
export interface ICourse_Role extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    content: string;
    description: string;
    image: string;
    name: string;
    slug: string;
    isDeleted: boolean;
    deletedAt: Date;
    courses: Array<any>;
    saveAsync(): any;
    removeAsync(): any;
}
export interface ICourse_RoleModel extends mongoose.Model<ICourse_Role> {
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
declare const model: ICourse_RoleModel;
export { model as Course_Role };
