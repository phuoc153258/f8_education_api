import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Types } from "mongoose";
import { Transaction } from "../../models/transaction";
import { User } from "../../models/user";

const transactionService = {
  create: async (param) => {
    const transactionFounded = await Transaction.findOne({
      app_trans_id: param.app_trans_id,
    });
    if (transactionFounded) return;
    const transaction = new Transaction(param);
    const transactionrSave = await transaction.saveAsync();

    return Promise.resolve(transactionrSave);
  },
};

export { transactionService };
