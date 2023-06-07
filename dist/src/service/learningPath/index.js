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
const course_1 = require("../../models/course");
const course_role_1 = require("../../models/course_role");
const learningPathService = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseRoles = yield course_role_1.Course_Role.aggregate([
                {
                    $lookup: {
                        from: "courses",
                        localField: "courses.courseId",
                        foreignField: "_id",
                        as: "courses",
                    },
                },
            ]);
            return Promise.resolve(courseRoles);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    show: (user, slug) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const courseRole = await Course_Role.aggregate([
            //   {
            //     $match: {
            //       slug: slug,
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "group_course_roles",
            //       localField: "_id",
            //       foreignField: "courseRoleId",
            //       as: "group_course_roles",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "courses",
            //       localField: "group_course_roles.courses.courseId",
            //       foreignField: "_id",
            //       as: "courses",
            //     },
            //   },
            // ]);
            let courseRole = yield course_role_1.Course_Role.aggregate([
                {
                    $match: {
                        slug: slug,
                    },
                },
                {
                    $lookup: {
                        from: "group_course_roles",
                        localField: "_id",
                        foreignField: "courseRoleId",
                        as: "group_course_roles",
                    },
                },
            ]);
            const learningPathResponsePromise = courseRole[0].group_course_roles.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                let newItem = Object.assign(Object.assign({}, item), { courses: [] });
                const newCourses = item.courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield course_1.Course.findOne({
                        _id: mongoose_1.default.Types.ObjectId(course.courseId),
                    });
                }));
                newItem.courses = yield Promise.all(newCourses);
                return newItem;
            }));
            courseRole[0].group_course_roles = yield Promise.all(learningPathResponsePromise);
            return Promise.resolve(courseRole[0]);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
};
exports.default = learningPathService;
//# sourceMappingURL=index.js.map