"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.API_CONFIG = void 0;
exports.API_CONFIG = {
    responseMessage: {
        errorMessage: "Có lỗi xảy ra!",
        createSuccess: "Tạo thành công!",
        deleteSuccess: "Xoá thành công!",
        updateSuccess: "Sửa thành công!",
        getListSuccess: "Lấy danh sách thành công!",
        getSuccess: "Lấy thành công!",
    },
};
class ApiResponse {
    constructor(responseCode, message = null, data = null) {
        this.response_code = responseCode;
        this.message = message;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api.js.map