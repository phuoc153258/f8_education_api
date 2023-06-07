import mongoose, { Types } from "mongoose";
export interface ITransaction extends mongoose.Document {
    _id: Types.ObjectId;
    app_trans_id?: string;
    userId?: mongoose.Types.ObjectId;
    courseId?: mongoose.Types.ObjectId;
    value?: Number;
    status?: Number;
    description?: String;
    saveAsync(): any;
    removeAsync(): any;
}
export interface ITransactionModel extends mongoose.Model<ITransaction> {
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
declare const model: ITransactionModel;
export { model as Transaction };
