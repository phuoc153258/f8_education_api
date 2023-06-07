declare const userController: {
    list: (req: any, res: any, next: any) => Promise<any>;
    get: (req: any, res: any, next: any) => Promise<any>;
    update: (req: any, res: any, next: any) => Promise<any>;
    deactive: (req: any, res: any, next: any) => Promise<any>;
    get_me: (req: any, res: any, next: any) => Promise<any>;
    importListUser: (req: any, res: any, next: any) => Promise<any>;
    updateCurrentUser: (req: any, res: any, next: any) => Promise<any>;
};
export default userController;
