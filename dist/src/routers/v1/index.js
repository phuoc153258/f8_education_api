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
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const file_1 = __importDefault(require("./file"));
const course_1 = __importDefault(require("./course"));
const learningPath_1 = __importDefault(require("./learningPath"));
const payment_1 = __importDefault(require("./payment"));
const course_2 = __importDefault(require("./admin/course"));
const level_1 = __importDefault(require("./admin/level"));
const willLearn_1 = __importDefault(require("./admin/willLearn"));
const requirement_1 = __importDefault(require("./admin/requirement"));
const track_1 = __importDefault(require("./admin/track"));
const step_1 = __importDefault(require("./admin/step"));
const router = express.Router();
/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
router.use("/file", file_1.default);
router.use("/course", course_1.default);
router.use("/learning-path", learningPath_1.default);
router.use("/payment", payment_1.default);
router.use("/admin/course", course_2.default);
router.use("/admin/level", level_1.default);
router.use("/admin/willLearn", willLearn_1.default);
router.use("/admin/requirement", requirement_1.default);
router.use("/admin/track", track_1.default);
router.use("/admin/step", step_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map