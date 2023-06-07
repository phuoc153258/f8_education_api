declare const authMiddleWare: {
    requireLogin: (req: any, res: any, next: any) => Promise<any>;
    isLogin: (req: any, res: any, next: any) => Promise<void>;
};
export default authMiddleWare;
