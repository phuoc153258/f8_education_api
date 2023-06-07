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
Object.defineProperty(exports, "__esModule", { value: true });
const course_level_1 = require("../../../models/course_level");
const levelService = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return course_level_1.Course_Level.find({}).exec();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    update: (id, level) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return "dsa";
            // return Course_Level.find({}).exec();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = levelService;
//# sourceMappingURL=index.js.map