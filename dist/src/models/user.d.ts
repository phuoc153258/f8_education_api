import mongoose, { Types } from "mongoose";
export interface IUser extends mongoose.Document {
    _id: Types.ObjectId;
    avatar: string;
    email: string;
    email_verified: boolean;
    is_active: boolean;
    password: string;
    phone: string;
    type_account: string;
    role: Types.ObjectId;
    slug: string;
    fullname: string;
    bio: string;
    facebook_link: string;
    instagram_link: string;
    linkedin_link: string;
    twitter_link: string;
    youtube_link: string;
    createdAt: any;
    updatedAt: any;
    saveAsync(): any;
    removeAsync(): any;
}
export interface IUserModel extends mongoose.Model<IUser> {
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
declare const model: IUserModel;
export { model as User };
