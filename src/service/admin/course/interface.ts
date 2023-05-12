export interface ICourseService {
  list: () => any;
  create: (body: any, files: any) => any;
  delete: (id: any) => any;
}
