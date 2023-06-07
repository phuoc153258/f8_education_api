declare const mailController: {
    sendMail: (req: any, res: any, next: any) => Promise<any>;
    verify: (req: any, res: any, next: any) => Promise<any>;
    confirmVerify: (req: any, res: any, next: any) => Promise<any>;
};
export default mailController;
