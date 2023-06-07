import mongoose from "mongoose";
interface IOTP {
    email: string;
    otp: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const model: mongoose.Model<IOTP, {}, {}>;
export { model as OTP };
