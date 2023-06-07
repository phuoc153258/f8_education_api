export interface ICourseService {
    list: () => any;
    create: (body: any, files: any) => any;
    delete: (id: any) => any;
    detail: (id: any) => any;
    update: (id: any, course: any, files: any) => any;
    position: (id: any) => any;
}
