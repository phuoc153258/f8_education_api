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
const course_1 = __importDefault(require("../../../controller/api/admin/course"));
const authenMiddleWare_1 = __importDefault(require("../../../middlewares/auth/authenMiddleWare"));
const adminMiddleware_1 = __importDefault(require("../../../middlewares/auth/adminMiddleware"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = express.Router({ mergeParams: true });
router
    .route("/:id")
    .delete(authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.delete)
    .put((0, express_fileupload_1.default)({ createParentPath: true }), authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.update)
    .get(authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.detail);
router
    .route("/:id/position")
    .get(authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.position);
router
    .route("/")
    .post((0, express_fileupload_1.default)({ createParentPath: true }), authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.create)
    .get(authenMiddleWare_1.default.requireLogin, adminMiddleware_1.default.isAdmin, course_1.default.list);
exports.default = router;
//# sourceMappingURL=course.js.map