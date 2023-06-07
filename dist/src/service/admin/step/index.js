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
const course_1 = __importDefault(require("../course"));
const track_1 = require("../../../models/track");
const step_1 = require("../../../models/step");
const stepService = {
    position: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trackModel = yield track_1.Track.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            }).exec();
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const stepModel = yield step_1.Step.find({ trackId: trackModel._id });
            return { trackId: trackModel._id, position: stepModel.length };
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    create: (step) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trackModel = yield track_1.Track.findOne({
                _id: mongoose_1.default.Types.ObjectId(step.trackId),
            }).exec();
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const position = yield stepService.position(trackModel._id);
            if (step.position > position.position)
                return Promise.reject(new Error("Position is not valid !!!"));
            const steps = yield step_1.Step.find({
                position: { $gte: step.position },
                trackId: trackModel._id,
            });
            steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                item.position += 1;
                yield item.save();
            }));
            const newStepModel = new step_1.Step();
            if (step.title)
                newStepModel.title = step.title;
            if (step.duration)
                newStepModel.duration = step.duration;
            if (step.description)
                newStepModel.description = step.description;
            if (step.imageUrl)
                newStepModel.imageUrl = step.imageUrl;
            if (step.videoUrl)
                newStepModel.videoUrl = step.videoUrl;
            newStepModel.position = step.position;
            newStepModel.isPublished = step.isPublished;
            if (step.trackId)
                newStepModel.trackId = mongoose_1.default.Types.ObjectId(step.trackId);
            yield newStepModel.save();
            return yield course_1.default.detail(trackModel.courseId);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const stepModel = yield step_1.Step.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!stepModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const trackModel = yield track_1.Track.findOne({
                _id: stepModel.trackId,
            });
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const steps = yield step_1.Step.find({
                position: { $gt: stepModel.position },
                trackId: trackModel._id,
            });
            steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                item.position -= 1;
                yield item.save();
            }));
            yield stepModel.delete();
            return yield course_1.default.detail(trackModel.courseId);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    update: (id, step) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const stepModel = yield step_1.Step.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!stepModel)
                return Promise.reject(new Error("Step is not exits !!!"));
            const trackModel = yield track_1.Track.findOne({
                _id: step.trackId,
            });
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            if (stepModel.trackId.toString() == step.trackId) {
                if (stepModel.position > step.position) {
                    const steps = yield step_1.Step.find({
                        position: { $gte: step.position, $lt: stepModel.position },
                        trackId: trackModel._id,
                    });
                    steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                        item.position += 1;
                        yield item.save();
                    }));
                }
                else if (stepModel.position < step.position) {
                    const steps = yield step_1.Step.find({
                        position: { $gt: stepModel.position, $lte: step.position },
                        trackId: trackModel._id,
                    });
                    steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                        item.position -= 1;
                        yield item.save();
                    }));
                }
            }
            else {
                // cap nhat lai position cua track cu~
                const stepsOld = yield step_1.Step.find({
                    position: { $gt: stepModel.position },
                    trackId: stepModel.trackId,
                });
                stepsOld.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                    item.position -= 1;
                    yield item.save();
                }));
                // cap nhat lai position cua track moi
                if (stepModel.position > step.position) {
                    const steps = yield step_1.Step.find({
                        position: { $gte: step.position, $lt: stepModel.position },
                        trackId: trackModel._id,
                    });
                    steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                        item.position += 1;
                        yield item.save();
                    }));
                }
                else if (stepModel.position < step.position) {
                    const steps = yield step_1.Step.find({
                        position: { $gt: stepModel.position, $lte: step.position },
                        trackId: trackModel._id,
                    });
                    steps.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                        item.position -= 1;
                        yield item.save();
                    }));
                }
            }
            if (step.title)
                stepModel.title = step.title;
            if (step.description)
                stepModel.title = step.title;
            // if (step.duration) stepModel.duration = step.duration;
            if (step.videoUrl)
                stepModel.videoUrl = step.videoUrl;
            if (step.imageUrl)
                stepModel.imageUrl = step.imageUrl;
            stepModel.position = step.position;
            stepModel.isPublished = step.isPublished;
            if (step.trackId)
                stepModel.trackId = step.trackId;
            yield stepModel.save();
            return yield course_1.default.detail(trackModel.courseId);
            //   return "DSA";
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = stepService;
//# sourceMappingURL=index.js.map