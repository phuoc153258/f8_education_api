export interface ICourseService {
  combined: (user: any) => any;
  analytics: () => any;
  courseDetail: (user: any, slug: any) => any;
  tracks: (user: any, slug: any) => any;
}
