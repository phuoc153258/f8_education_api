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
const course_level_1 = require("../../../models/course_level");
const file_1 = __importDefault(require("../../file/file"));
const track_1 = require("../../../models/track");
const course_will_learn_1 = require("../../../models/course_will_learn");
const course_requirement_1 = require("../../../models/course_requirement");
const courseService = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return course_1.Course.find({}).exec();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    create: (body, files) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseFound = yield course_1.Course.findOne({
                title: body.title,
            });
            if (courseFound) {
                throw new Error("Khóa học này đã tồn tại!");
            }
            let course = new course_1.Course();
            if (body.title)
                course.title = body.title;
            if (body.description)
                course.description = body.description;
            const level = yield course_level_1.Course_Level.findOne({ _id: body.levelId }).exec();
            if (!level)
                throw new Error("Cấp độ không tồn tại");
            course.levelId = level._id;
            if (files) {
                const response = yield file_1.default.upload(files);
                if (response.image)
                    course.image = response.image;
                if (response.icon)
                    course.icon = response.icon;
            }
            if (body.isPro)
                course.isPro = body.isPro;
            if (body.price)
                course.price = body.price;
            course.isPublished = false;
            const courseSave = yield course.save();
            return Promise.resolve(courseSave);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield course_1.Course.findOneAndDelete({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    detail: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
            let courseTemp = {
                image: course.image,
                icon: course.icon,
                studentCount: course.studentCount,
                isDeleted: course.isDeleted,
                deletedAt: course.deletedAt,
                isPublished: course.isPublished,
                publishedAt: course.publishedAt,
                levelId: course.levelId,
                _id: course._id,
                title: course.title,
                description: course.description,
                slug: course.slug,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
                tracks: [],
                isRegister: false,
                level: null,
                willLearns: [],
                requirements: [],
                isPro: course.isPro,
                price: course.price,
            };
            let tracks = yield track_1.Track.aggregate([
                {
                    $match: {
                        courseId: course._id,
                    },
                },
                {
                    $lookup: {
                        from: "steps",
                        localField: "_id",
                        foreignField: "trackId",
                        as: "steps",
                    },
                },
                {
                    $sort: {
                        "track.position": 1,
                        "steps.position": 1,
                    },
                },
            ]);
            tracks = tracks.map((item) => {
                let newItem = Object.assign({}, item);
                newItem.steps = item.steps.sort(function (a, b) {
                    return a.position - b.position;
                });
                return newItem;
            });
            tracks.sort(function (a, b) {
                return a.position - b.position;
            });
            courseTemp.tracks = tracks;
            courseTemp.level = yield course_level_1.Course_Level.findOne({
                _id: course.levelId,
            }).exec();
            courseTemp.willLearns = yield course_will_learn_1.Course_Will_Learn.find({
                courseId: course._id,
            });
            courseTemp.requirements = yield course_requirement_1.Course_Requirement.find({
                courseId: course._id,
            });
            return courseTemp;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    update(id, course, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseModel = yield course_1.Course.findOne({
                    _id: mongoose_1.default.Types.ObjectId(id),
                });
                if (!courseModel)
                    return Promise.reject(new Error("Course is not exits !!!"));
                if (course.title)
                    courseModel.title = course.title;
                if (course.description)
                    courseModel.description = course.description;
                if (course.level) {
                    const level = yield course_level_1.Course_Level.findOne({
                        _id: mongoose_1.default.Types.ObjectId(course.level),
                    });
                    if (!level)
                        return Promise.reject(new Error("Level is not exits !!!"));
                    else
                        courseModel.levelId = level._id;
                }
                if (course.isPro)
                    courseModel.isPro = course.isPro;
                if (course.price)
                    courseModel.price = course.price;
                if (course.isPublished) {
                    courseModel.isPublished = course.isPublished;
                    courseModel.publishedAt = new Date();
                }
                if (files) {
                    const response = yield file_1.default.upload(files);
                    if (response.image)
                        courseModel.image = response.image;
                    if (response.icon)
                        courseModel.icon = response.icon;
                }
                yield courseModel.save();
                const courseResponse = yield courseService.detail(courseModel._id.toString());
                return courseResponse;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    },
    position(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    },
};
exports.default = courseService;
//# sourceMappingURL=index.js.map