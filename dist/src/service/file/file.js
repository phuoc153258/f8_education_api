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
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const file_1 = require("../helper/file");
const base_1 = require("../../messages/error/base");
const env_1 = __importDefault(require("../../../config/env"));
const fileService = {
    upload: (files) => __awaiter(void 0, void 0, void 0, function* () {
        let filenames = {};
        Object.keys(files).forEach((key) => {
            let extFile = path_1.default.extname(files[key].name);
            let savePath = (0, file_1.configFilePath)(extFile);
            const fileName = (0, uuid_1.v4)() + extFile;
            const filepath = path_1.default.join(__dirname, env_1.default.rootUpload, savePath + "/" + fileName);
            files[key].mv(filepath, (err) => {
                if (err)
                    return Promise.reject(new Error(base_1.BaseErrorMessage.SOME_THING_WENT_WRONG));
            });
            filenames[key] = fileName;
        });
        return Promise.resolve(filenames);
    }),
    get: (fileName, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const savePath = (0, file_1.configFilePath)(path_1.default.extname(fileName));
        res.sendFile(path_1.default.join(path_1.default.join(__dirname, env_1.default.rootUpload, savePath + "/" + fileName)), (err) => {
            if (err) {
                next(err);
            }
        });
    }),
};
exports.default = fileService;
//# sourceMappingURL=file.js.map