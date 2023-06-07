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
const course_2 = __importDefault(require("../course"));
const course_requirement_1 = require("../../../models/course_requirement");
const requirementService = {
    update: (id, requirement) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(requirement.courseId),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            const requirementModel = yield course_requirement_1.Course_Requirement.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (requirement.content)
                requirementModel.content = requirement.content;
            yield requirementModel.save();
            return yield course_2.default.detail(requirementModel.courseId);
            // return Course_Level.find({}).exec();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield course_requirement_1.Course_Requirement.findOne({
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
    create: (requirement) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(requirement.courseId),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            let requirementModel = new course_requirement_1.Course_Requirement();
            requirementModel.courseId = courseModel._id;
            if (!requirement.content)
                return Promise.reject(new Error("Nội dung không được trống !!!"));
            requirementModel.content = requirement.content;
            yield requirementModel.save();
            const courseResponse = yield course_2.default.detail(requirement.courseId);
            return courseResponse;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = requirementService;
//# sourceMappingURL=index.js.map