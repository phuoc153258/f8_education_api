"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_SCOPE = exports.GOOGLE_SCOPE = exports.FACEBOOK_SCOPE = void 0;
exports.FACEBOOK_SCOPE = {
    profileFields: [
        "id",
        "emails",
        "gender",
        "link",
        "locale",
        "name",
        "timezone",
        "updated_time",
        "verified",
        "photos",
        "hometown",
        "friends",
    ],
    scope: ["email"],
};
exports.GOOGLE_SCOPE = {
    scope: ["profile", "email"],
};
exports.GITHUB_SCOPE = {
    scope: ["user:email"],
};
//# sourceMappingURL=scope.js.map