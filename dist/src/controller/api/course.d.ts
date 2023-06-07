declare const courseController: {
    combined: (req: any, res: any, next: any) => Promise<any>;
    analytics: (req: any, res: any, next: any) => Promise<any>;
    courseDetail: (req: any, res: any, next: any) => Promise<any>;
    tracks: (req: any, res: any, next: any) => Promise<any>;
    steps: (req: any, res: any, next: any) => Promise<any>;
    stepDetail: (req: any, res: any, next: any) => Promise<any>;
    registerCourse: (req: any, res: any, next: any) => Promise<any>;
    completedLesson: (req: any, res: any, next: any) => Promise<any>;
};
export default courseController;
