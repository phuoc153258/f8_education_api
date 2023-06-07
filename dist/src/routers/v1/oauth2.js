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
const callback_1 = require("../../../config/passport/callback");
const scope_1 = require("../../constants/scope");
const passport = require("passport");
const oatuh2_1 = __importDefault(require("../../controller/api/oatuh2"));
const router = express.Router();
router.route("/google").get(passport.authenticate("google"));
router
    .route("/google/callback")
    .get(passport.authenticate("google", callback_1.CALLBACK_URIS));
router
    .route("/facebook")
    .get(passport.authenticate("facebook", scope_1.FACEBOOK_SCOPE.scope));
router
    .route("/facebook/callback")
    .get(passport.authenticate("facebook", callback_1.CALLBACK_URIS));
router.route("/github").get(passport.authenticate("github"));
router
    .route("/github/callback")
    .get(passport.authenticate("github", callback_1.CALLBACK_URIS));
router.route("/success").get(oatuh2_1.default.success);
router.route("/login").post(oatuh2_1.default.login);
exports.default = router;
//# sourceMappingURL=oauth2.js.map