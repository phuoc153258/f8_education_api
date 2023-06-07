declare const willLearnController: {
    update: (req: any, res: any, next: any) => Promise<any>;
    delete: (req: any, res: any, next: any) => Promise<any>;
    create: (req: any, res: any, next: any) => Promise<any>;
};
export default willLearnController;
