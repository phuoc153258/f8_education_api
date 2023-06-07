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
exports.transactionService = void 0;
const transaction_1 = require("../../models/transaction");
const transactionService = {
    create: (param) => __awaiter(void 0, void 0, void 0, function* () {
        const transactionFounded = yield transaction_1.Transaction.findOne({
            app_trans_id: param.app_trans_id,
        });
        if (transactionFounded)
            return;
        const transaction = new transaction_1.Transaction(param);
        const transactionrSave = yield transaction.saveAsync();
        return Promise.resolve(transactionrSave);
    }),
};
exports.transactionService = transactionService;
//# sourceMappingURL=index.js.map