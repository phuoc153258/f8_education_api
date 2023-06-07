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
const base_1 = require("../../messages/success/base");
const course_1 = __importDefault(require("../../service/course"));
const courseController = {
    combined: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const courseResponse = yield course_1.default.combined(user, false);
            const courseResponsePro = yield course_1.default.combined(user, true);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, {
                freeCourses: courseResponse,
                proCourses: courseResponsePro,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    analytics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseResponse = yield course_1.default.analytics();
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    courseDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const courseResponse = yield course_1.default.courseDetail(user, slug);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    tracks: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const courseResponse = yield course_1.default.tracks(user, slug);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    steps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const courseResponse = yield course_1.default.steps(user, slug);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    stepDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug, id } = req.params;
            const courseResponse = yield course_1.default.stepsDetail(user, slug, id);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    registerCourse: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const courseResponse = yield course_1.default.registerCourse(user, slug, false);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    completedLesson: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const { stepId } = req.body;
            const courseResponse = yield course_1.default.completedLesson(user, slug, stepId);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, courseResponse);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = courseController;
//# sourceMappingURL=course.js.map