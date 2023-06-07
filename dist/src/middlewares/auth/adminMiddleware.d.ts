declare const adminMiddleware: {
    isAdmin: (req: any, res: any, next: any) => Promise<any>;
};
export default adminMiddleware;
