"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = require("../../src/constants/scope");
const env_1 = __importDefault(require("../env"));
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID = env_1.default.google.client_id;
const GOOGLE_CLIENT_SECRET = env_1.default.google.client_secret;
const GOOGLE_CALLBACK_URI = env_1.default.google.callback_uri;
const GITHUB_CLIENT_ID = env_1.default.github.client_id;
const GITHUB_CLIENT_SECRET = env_1.default.github.client_secret;
const GITHUB_CALLBACK_URI = env_1.default.github.callback_uri;
const FACEBOOK_APP_ID = env_1.default.facebook.app_id;
const FACEBOOK_APP_SECRET = env_1.default.facebook.app_secret;
const FACEBOOK_CALLBACK_URI = env_1.default.facebook.callback_uri;
const CLIENT_URL = env_1.default.app_uri;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CLIENT_URL + GOOGLE_CALLBACK_URI,
    scope: scope_1.GOOGLE_SCOPE.scope,
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    scope: scope_1.GITHUB_SCOPE.scope,
    callbackURL: CLIENT_URL + GITHUB_CALLBACK_URI,
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: CLIENT_URL + FACEBOOK_CALLBACK_URI,
    profileFields: scope_1.FACEBOOK_SCOPE.profileFields,
}, function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=index.js.map