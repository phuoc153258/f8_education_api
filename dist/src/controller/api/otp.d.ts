declare const otpController: {
    sendMail: (req: any, res: any, next: any) => Promise<any>;
    sendPhone: (req: any, res: any, next: any) => Promise<any>;
    verify: (req: any, res: any, next: any) => Promise<any>;
};
export default otpController;
