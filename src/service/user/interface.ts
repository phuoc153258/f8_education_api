import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";
import { IUpdateUserRequestDTO } from "../../dtos/request/user/UpdateUserRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";

export interface IUserService {
  get: (slug: any) => any;
  list: (options: QueryOptions) => Promise<any>;
  update: (
    request: IUpdateUserRequestDTO,
    userId: mongoose.Types._ObjectId
  ) => Promise<any>;
  deactive: (listUserId: [mongoose.Types._ObjectId]) => Promise<any>;
  get_me: (req: any) => Promise<any>;
  importListUser: (listUser: Array<RegisterRequestDTO>) => Promise<any>;
  create: (request: RegisterRequestDTO, userCount?: number) => Promise<any>;
  updateCurrentUser: (user: any, body: any, files: any) => any;
}
