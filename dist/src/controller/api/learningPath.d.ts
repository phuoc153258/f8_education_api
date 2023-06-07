declare const learningPathController: {
    list: (req: any, res: any, next: any) => Promise<any>;
    show: (req: any, res: any, next: any) => Promise<any>;
};
export default learningPathController;
