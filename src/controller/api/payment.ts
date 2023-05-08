import axios from "axios";
import { BaseSuccesMessage } from "../../messages/success/base";
import cryptojs from "crypto-js";
import moment from "moment";
import qs from "qs";
import tokenService from "../../service/token";
import env from "../../../config/env";
import { userService } from "../../service/user";
import { Course } from "../../models/course";
import { transactionService } from "../../service/transaction";
import mongooose from "mongoose";
import courseService from "../../service/course";

const PaymentController = {
  payment: async (req, res, next) => {
    const { user } = req;
    const { slug } = req.params;
    const course = await Course.findOne({
      slug: slug,
      isPro: true,
      isPublished: true,
    }).exec();
    if (course == null) return res.json({ message: "Course is not exits !" });

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
    const order: any = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: user.slug,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 1299000,
      description: description,
      bank_code: "zalopayapp",
      mac: "",
    };

    const data =
      config.app_id +
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
    order.mac = cryptojs.HmacSHA256(data, config.key1).toString();

    axios
      .post(config.endpoint, null, { params: order })
      .then((res2) => {
        return res.success(BaseSuccesMessage.SUCCESS, {
          payment: res2.data,
          code: order.app_trans_id,
          description,
        });
      })
      .catch((err) => next(err));
  },
  checkPayment: async (req, res, next) => {
    const { user } = req;
    const { app_trans_id, description } = req.query;
    const { slug } = req.params;

    const course = await Course.findOne({
      slug: slug,
      isPro: true,
      isPublished: true,
    }).exec();
    if (!course) res.json({ message: "Course is not exits !" });

    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/query",
    };
    const postData = {
      app_id: config.app_id,
      app_trans_id: app_trans_id, // Input your app_trans_id
      mac: "",
    };

    const data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = cryptojs.HmacSHA256(data, config.key1).toString();

    // const postConfig: any = {
    //   method: "post",
    //   url: config.endpoint,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: qs.stringify(postData),
    // };

    axios
      .post(config.endpoint, qs.stringify(postData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async function (response) {
        const return_code = response?.data?.return_code;
        if (return_code == 1) {
          await transactionService.create({
            userId: mongooose.Types.ObjectId(user._id),
            courseId: course._id,
            value: response?.data.amount,
            status: return_code,
            app_trans_id: app_trans_id,
            description: description,
          });
          await courseService.registerCourse(user, slug, true);
        }
        return res.success(BaseSuccesMessage.SUCCESS, response.data);
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
  },
};

export default PaymentController;
