"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { NODE_APP_PORT, NODE_APP_HOST, NODE_APP_URI } = process.env;
exports.default = {
    env: "production",
    // db: `mongodb://localhost:27017/f8_education_dev`,
    db: `mongodb+srv://phuoc153258:Outisde2@cluster0.hwttyjb.mongodb.net/f8_education_dev`,
    db_back_up: `mongodb://localhost:27017/f8_education_dev`,
    port: NODE_APP_PORT,
    app_host: NODE_APP_HOST,
    app_uri: NODE_APP_URI,
    jwt: {
        secret: "2b06c243-4e10-427a-ba57-7de64e11deee",
        expiresIn: "1y",
    },
    mail: {
        service: "gmail",
        root: "ndphuoc.2504.dev@gmail.com",
        key: "mimujpuapubpqigo",
        secret: "8e244dcc-8b42-4ae9-8d2b-cec49aa1ec5c",
        expiresIn: "3m",
    },
    otp: {
        secret: "16c2ae54-4f41-4641-b922-bdf979fe063c",
        expiresIn: "3m",
    },
    sms: {
        sid: "AC01078c94d9b3781bdf184750450fcbd6",
        auth_token: "4ab7deffc7428b3c6cb6ea4de7119787",
    },
    google: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        client_id: "409604480079-jbtu4kj3jegskujbkiebvr0h3s9s7jg4.apps.googleusercontent.com",
        client_secret: "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",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        callback_uri: "/api/v1/oauth2/google/callback",
    },
    facebook: {
        app_id: "411466537792783",
        app_secret: "d26c2283d1cbd6b78dbd26cbb03437aa",
        callback_uri: "/api/v1/oauth2/facebook/callback",
    },
    github: {
        client_id: "716df12f71fc67a458e8",
        client_secret: "378a7919af48f982fad7a57630fbd34e1a91ea55",
        callback_uri: "/api/v1/oauth2/github/callback",
    },
    oauth2Jwt: {
        secret: "e342cc8d-e3d0-4b8f-be36-e3e189ca3de6",
        expiresIn: "1m",
    },
    rootUpload: "../../../../",
};
//# sourceMappingURL=production.js.map