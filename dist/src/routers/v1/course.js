"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const course_1 = __importDefault(require("../../controller/api/course"));
const authenMiddleWare_1 = __importDefault(require("../../middlewares/auth/authenMiddleWare"));
const router = express.Router({ mergeParams: true });
router
    .route("/:slug/steps/:id")
    .get(authenMiddleWare_1.default.requireLogin, course_1.default.stepDetail);
router
    .route("/:slug/steps")
    .get(authenMiddleWare_1.default.requireLogin, course_1.default.steps);
router
    .route("/:slug/completed-lesson")
    .post(authenMiddleWare_1.default.requireLogin, course_1.default.completedLesson);
router
    .route("/tracks/:slug")
    .get(authenMiddleWare_1.default.requireLogin, course_1.default.tracks);
router
    .route("/combined")
    .get(authenMiddleWare_1.default.isLogin, course_1.default.combined);
router.route("/analytics").get(course_1.default.analytics);
router
    .route("/:slug")
    .post(authenMiddleWare_1.default.requireLogin, course_1.default.registerCourse)
    .get(authenMiddleWare_1.default.requireLogin, course_1.default.courseDetail);
exports.default = router;
//# sourceMappingURL=course.js.map