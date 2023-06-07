export declare const API_CONFIG: {
    responseMessage: {
        errorMessage: string;
        createSuccess: string;
        deleteSuccess: string;
        updateSuccess: string;
        getListSuccess: string;
        getSuccess: string;
    };
};
declare class ApiResponse {
    private response_code;
    private message;
    private data;
    constructor(responseCode: any, message?: any, data?: any);
}
export { ApiResponse };
