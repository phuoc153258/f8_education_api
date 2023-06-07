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
const user_course_1 = require("../../models/user_course");
const course_level_1 = require("../../models/course_level");
const course_requirement_1 = require("../../models/course_requirement");
const course_will_learn_1 = require("../../models/course_will_learn");
const track_1 = require("../../models/track");
const courseService = {
    combined: (user, isPro = false) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield course_1.Course.find({ isPro: isPro }).exec();
            if (!courses)
                return Promise.reject(new Error("Course is not exits !!!"));
            const newCoursesPromises = courses.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                let course = {
                    image: item.image,
                    icon: item.icon,
                    studentCount: item.studentCount,
                    isDeleted: item.isDeleted,
                    deletedAt: item.deletedAt,
                    isPublished: item.isPublished,
                    publishedAt: item.publishedAt,
                    levelId: item.levelId,
                    _id: item._id,
                    title: item.title,
                    description: item.description,
                    slug: item.slug,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    tracks: [],
                    isRegister: false,
                    isPro: item.isPro,
                    price: item.price,
                };
                const tracks = yield track_1.Track.aggregate([
                    {
                        $match: {
                            courseId: item._id,
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
                ]);
                course.tracks = tracks;
                if (user) {
                    const userCourses = yield user_course_1.User_Course.findOne({
                        userId: new mongoose_1.default.Types.ObjectId(user._id),
                        courseId: item._id,
                    }).exec();
                    if (userCourses !== null)
                        course.isRegister = true;
                }
                return course;
            }));
            const newCourses = yield Promise.all(newCoursesPromises);
            return Promise.resolve(newCourses);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    analytics: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield course_1.Course.find({ isPro: false })
                .select("studentCount")
                .exec();
            let studentCount = 0;
            courses.forEach((item) => {
                studentCount += item.studentCount;
            });
            return { courseCount: courses.length, studentCount };
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    courseDetail: (user, slug) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({
                slug: slug,
                isPublished: true,
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
            const userCoursesTemp = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }).exec();
            if (course.isPro === true && courseTemp === null)
                return Promise.reject(new Error("You must buy this course first !"));
            if (userCoursesTemp !== null)
                courseTemp.isRegister = true;
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
    tracks: (user, slug) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({ slug: slug });
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
            let trackTemp = {
                tracks: [],
                isRegister: true,
                userProgress: [],
                trackStepCount: 0,
                passPercent: 0,
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
            trackTemp.tracks = tracks;
            const userCourses = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }).exec();
            if (!userCourses || userCourses === null)
                return Promise.reject(new Error("Bạn chưa đăng ký khóa học này !"));
            else
                trackTemp.userProgress = userCourses.lessonCompleted;
            tracks.forEach((track) => {
                track.steps.forEach((step) => {
                    trackTemp.trackStepCount += 1;
                });
            });
            trackTemp.passPercent =
                100 * (trackTemp.userProgress.length / trackTemp.trackStepCount);
            return Promise.resolve(trackTemp);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    steps: (user, slug) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({ slug: slug });
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
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
            let continue_id = "";
            let next_id = "";
            let previous_id = "";
            let index = 0;
            let step = {};
            let track = {};
            const userCourse = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }).exec();
            if (!userCourse || userCourse === null)
                return Promise.reject(new Error("Bạn chưa đăng ký khóa học này !"));
            else {
                tracks.forEach((x) => {
                    x.steps.forEach((y) => {
                        if (userCourse.indexVideo - 1 == index) {
                            previous_id = y._id;
                        }
                        if (userCourse.indexVideo == index) {
                            continue_id = y._id;
                            step = y;
                            track = x;
                        }
                        if (userCourse.indexVideo + 1 == index) {
                            next_id = y._id;
                        }
                        index++;
                    });
                });
            }
            return Promise.resolve({
                isRegister: true,
                course,
                continue_id,
                next_id,
                previous_id,
                userCourse,
                step,
                track,
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    stepsDetail: (user, slug, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({ slug: slug });
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
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
            let continue_id = "";
            let next_id = "";
            let previous_id = "";
            let index = 0;
            let indexTemp = 0;
            let step = {};
            let track = {};
            const userCourse = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }).exec();
            if (!userCourse || userCourse === null)
                return Promise.reject(new Error("Bạn chưa đăng ký khóa học này !"));
            else {
                tracks.forEach((x) => {
                    x.steps.forEach((y) => __awaiter(void 0, void 0, void 0, function* () {
                        if (y._id.toString() == id) {
                            userCourse.indexVideo = indexTemp;
                            yield userCourse.save();
                        }
                        indexTemp++;
                    }));
                });
                tracks.forEach((x) => {
                    x.steps.forEach((y) => {
                        if (userCourse.indexVideo - 1 == index) {
                            previous_id = y._id;
                        }
                        if (userCourse.indexVideo == index) {
                            continue_id = y._id;
                            step = y;
                            track = x;
                        }
                        if (userCourse.indexVideo + 1 == index) {
                            next_id = y._id;
                        }
                        index++;
                    });
                });
            }
            return Promise.resolve({
                isRegister: true,
                course,
                continue_id,
                next_id,
                previous_id,
                userCourse,
                step,
                track,
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    registerCourse: (user, slug, isPro = false) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({ slug: slug, isPro: isPro }).exec();
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
            const userCourse = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            });
            if (!userCourse || userCourse === null) {
                const user_course = new user_course_1.User_Course({
                    userId: mongoose_1.default.Types.ObjectId(user._id),
                    courseId: course._id,
                    indexVideo: 0,
                    lessonCompleted: [],
                });
                course.studentCount += 1;
                yield course.save();
                yield user_course.save();
                return Promise.resolve(user_course);
            }
            else
                return Promise.resolve(userCourse);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    completedLesson: (user, slug, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield course_1.Course.findOne({ slug: slug }).exec();
            if (!course)
                return Promise.reject(new Error("Course is not exits !!!"));
            const userCourseTemp = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }).exec();
            if (!userCourseTemp || userCourseTemp === null)
                return Promise.reject(new Error("Bạn chưa đăng ký khóa học này !"));
            const isExistUserCourse = yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
                lessonCompleted: {
                    $elemMatch: { stepId: new mongoose_1.default.Types.ObjectId(id) },
                },
            });
            if (isExistUserCourse)
                return Promise.resolve(isExistUserCourse);
            const userCourse = yield user_course_1.User_Course.updateOne({ userId: new mongoose_1.default.Types.ObjectId(user._id), courseId: course._id }, {
                $push: {
                    lessonCompleted: {
                        _id: new mongoose_1.default.Types.ObjectId(),
                        stepId: mongoose_1.default.Types.ObjectId(id),
                    },
                },
            });
            return Promise.resolve(yield user_course_1.User_Course.findOne({
                userId: new mongoose_1.default.Types.ObjectId(user._id),
                courseId: course._id,
            }));
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = courseService;
//# sourceMappingURL=index.js.map