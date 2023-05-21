import { BaseSuccesMessage } from "../../../messages/success/base";
import levelService from "../../../service/admin/level/index";

const levelController = {
  list: async (req, res, next) => {
    try {
      const levelResponse = await levelService.list();
      return res.success(BaseSuccesMessage.SUCCESS, levelResponse);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const levelResponse = await levelService.update(id, req.body);
      return res.success(BaseSuccesMessage.SUCCESS, levelResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default levelController;
