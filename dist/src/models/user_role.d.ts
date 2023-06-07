import mongoose from "mongoose";
export interface IUser_Role extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    level: number;
    isDeleted: boolean;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    saveAsync(): any;
    removeAsync(): any;
}
export interface IUser_RoleModel extends mongoose.Model<IUser_Role> {
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
declare const model: IUser_RoleModel;
export { model as User_Role };
