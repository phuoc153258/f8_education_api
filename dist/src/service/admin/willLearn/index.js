"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const course_1 = require("../../../models/course");
const course_will_learn_1 = require("../../../models/course_will_learn");
const course_2 = __importDefault(require("../course"));
const willLearnService = {
    update: (id, willLearn) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(willLearn.courseId),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            const willLearnModel = yield course_will_learn_1.Course_Will_Learn.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (willLearn.content)
                willLearnModel.content = willLearn.content;
            yield willLearnModel.save();
            return yield course_2.default.detail(willLearnModel.courseId);
            // return Course_Level.find({}).exec();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield course_will_learn_1.Course_Will_Learn.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            yield response.delete();
            const courseResponse = yield course_2.default.detail(response.courseId);
            return courseResponse;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    create: (willLearn) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(willLearn.courseId),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            let willLearnModel = new course_will_learn_1.Course_Will_Learn();
            willLearnModel.courseId = courseModel._id;
            if (!willLearn.content)
                return Promise.reject(new Error("Nội dung không được trống !!!"));
            willLearnModel.content = willLearn.content;
            yield willLearnModel.save();
            const courseResponse = yield course_2.default.detail(willLearn.courseId);
            return courseResponse;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = willLearnService;
//# sourceMappingURL=index.js.map