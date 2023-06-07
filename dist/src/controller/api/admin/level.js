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
const base_1 = require("../../../messages/success/base");
const index_1 = __importDefault(require("../../../service/admin/level/index"));
const levelController = {
    list: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const levelResponse = yield index_1.default.list();
            return res.success(base_1.BaseSuccesMessage.SUCCESS, levelResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const levelResponse = yield index_1.default.update(id, req.body);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, levelResponse);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = levelController;
//# sourceMappingURL=level.js.map