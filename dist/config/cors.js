"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3002",
    "https://f8-education-rust.vercel.app",
];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
//# sourceMappingURL=cors.js.map