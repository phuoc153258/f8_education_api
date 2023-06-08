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
const learningPath_1 = __importDefault(require("../../service/learningPath"));
const learningPathController = {
    list: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const learningPathResponse = yield learningPath_1.default.list();
            return res.success(base_1.BaseSuccesMessage.SUCCESS, learningPathResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = req;
            const { slug } = req.params;
            const learningPathResponse = yield learningPath_1.default.show(user, slug);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, learningPathResponse);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = learningPathController;
//# sourceMappingURL=learningPath.js.map