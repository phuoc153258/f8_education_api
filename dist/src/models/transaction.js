"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const TransactionSchema = new Schema({
    app_trans_id: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
    },
    courseId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
    },
    value: {
        type: Number,
        require,
    },
    status: {
        type: Number,
        require,
    },
    description: {
        type: String,
        require,
    },
}, { timestamps: true });
TransactionSchema.plugin(paginate);
TransactionSchema.plugin(aggregatePaginate);
// TransactionSchema.index({
//   app_trans_id: "text",
//   description: "text",
//   value: "text",
// });
const model = mongoose_1.default.model("Transaction", TransactionSchema);
exports.Transaction = model;
//# sourceMappingURL=transaction.js.map