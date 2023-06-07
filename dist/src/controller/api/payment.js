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
const axios_1 = __importDefault(require("axios"));
const base_1 = require("../../messages/success/base");
const crypto_js_1 = __importDefault(require("crypto-js"));
const moment_1 = __importDefault(require("moment"));
const qs_1 = __importDefault(require("qs"));
const course_1 = require("../../models/course");
const transaction_1 = require("../../service/transaction");
const mongoose_1 = __importDefault(require("mongoose"));
const course_2 = __importDefault(require("../../service/course"));
const PaymentController = {
    payment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = req;
        const { slug } = req.params;
        const course = yield course_1.Course.findOne({
            slug: slug,
            isPro: true,
            isPublished: true,
        }).exec();
        if (course == null)
            return res.json({ message: "Course is not exits !" });
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create",
        };
        const embed_data = {};
        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const description = `F8 Education - Payment for Course ${course.title} #${transID}`;
        const order = {
            app_id: config.app_id,
            app_trans_id: `${(0, moment_1.default)().format("YYMMDD")}_${transID}`,
            app_user: user.slug,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 1299000,
            description: description,
            bank_code: "zalopayapp",
            mac: "",
        };
        const data = config.app_id +
            "|" +
            order.app_trans_id +
            "|" +
            order.app_user +
            "|" +
            order.amount +
            "|" +
            order.app_time +
            "|" +
            order.embed_data +
            "|" +
            order.item;
        order.mac = crypto_js_1.default.HmacSHA256(data, config.key1).toString();
        axios_1.default
            .post(config.endpoint, null, { params: order })
            .then((res2) => {
            return res.success(base_1.BaseSuccesMessage.SUCCESS, {
                payment: res2.data,
                code: order.app_trans_id,
                description,
            });
        })
            .catch((err) => next(err));
    }),
    checkPayment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = req;
        const { app_trans_id, description } = req.query;
        const { slug } = req.params;
        const course = yield course_1.Course.findOne({
            slug: slug,
            isPro: true,
            isPublished: true,
        }).exec();
        if (!course)
            res.json({ message: "Course is not exits !" });
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/query",
        };
        const postData = {
            app_id: config.app_id,
            app_trans_id: app_trans_id,
            mac: "",
        };
        const data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
        postData.mac = crypto_js_1.default.HmacSHA256(data, config.key1).toString();
        // const postConfig: any = {
        //   method: "post",
        //   url: config.endpoint,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   data: qs.stringify(postData),
        // };
        axios_1.default
            .post(config.endpoint, qs_1.default.stringify(postData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const return_code = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.return_code;
                if (return_code == 1) {
                    yield transaction_1.transactionService.create({
                        userId: mongoose_1.default.Types.ObjectId(user._id),
                        courseId: course._id,
                        value: response === null || response === void 0 ? void 0 : response.data.amount,
                        status: return_code,
                        app_trans_id: app_trans_id,
                        description: description,
                    });
                    yield course_2.default.registerCourse(user, slug, true);
                }
                return res.success(base_1.BaseSuccesMessage.SUCCESS, response.data);
            });
        })
            .catch(function (error) {
            console.log(error);
        });
        // axios(postConfig)
        //   .then(async function (response) {
        //     const data = response.data;
        //     return res.success(BaseSuccesMessage.SUCCESS, data);
        //   })
        //   .catch(function (error) {
        //     next(error);
        //   });
    }),
};
exports.default = PaymentController;
//# sourceMappingURL=payment.js.map