import mongoose from "mongoose";
import env from "../../../config/env";
import QueryOptions from "../../dtos/QueryOptions";
import UpdateUserRequestDTO from "../../dtos/request/user/UpdateUserRequestDTO";
import CreateUserResponseDTO from "../../dtos/response/user/CreateUserResponseDTO";
// import UserResponseDTO from "../../dtos/response/user/UserResponseDTO";

import { User } from "../../models";
import { userQuery } from "../../queries";

import { AuthErrorMessage } from "../../messages/error/auth";
import fileService from "../file/file";
import tokenService from "../token";

import { IUserService } from "./interface";
import { UserErrorMessage } from "../../messages/error/user";
import { UserSuccessMessage } from "../../messages/success/user";
import { PROVIDER } from "../../constants/provider";
import GoogleRequestDTO from "../../dtos/request/oatuh2/GoogleRequestDTO";
import { NAME_DEFAULT } from "../../constants/user";
import FacebookRequestDTO from "../../dtos/request/oatuh2/FacbookRequestDTO";
import GitHubRequestDTO from "../../dtos/request/oatuh2/GitHubRequestDTO";
import { User_Course } from "../../models/user_course";
import { Course } from "../../models/course";

const userService: IUserService = {
  get: async (slug) => {
    try {
      const user = await User.findOne({ slug: slug }).exec();
      if (!user)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));

      const courses = await Course.aggregate([
        {
          $lookup: {
            from: "user_courses",
            localField: "_id",
            foreignField: "courseId",
            as: "user_courses",
          },
        },
        {
          $match: {
            "user_courses.userId": user._id,
          },
        },
      ]);
      return Promise.resolve({ user, courses });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  list: async (options: QueryOptions) => {
    const query = {
      is_active: true,
    };
    const users = await userQuery.getAllUser(query, options);
    return Promise.resolve(users);
  },
  update: async (
    request: UpdateUserRequestDTO,
    userId: mongoose.Types._ObjectId
  ) => {
    try {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
      });
      if (!user)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));

      // if (request.first_name) {
      //   user.first_name = request.first_name;
      // }
      // if (request.last_name) {
      //   user.last_name = request.last_name;
      // }
      if (request.avatarUpload) {
        const file = request.avatarUpload;
        const response = await fileService.upload(file);
        if (response) {
          user.avatar = response.name;
        }
      }
      if (request.email) {
        const emailFound = await User.findOne({
          email: request.email,
        });

        if (emailFound && user.email != request.email) {
          return Promise.reject(new Error(AuthErrorMessage.EMAIL_IS_EXIST));
        }
        user.email = request.email;
      }
      if (request.phone) {
        user.phone = request.phone;
      }

      const userUpdate = await user.saveAsync();

      // const response = new UserResponseDTO().responseDTO(userUpdate);
      return Promise.resolve(userUpdate);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deactive: async (listUserId: [mongoose.Types._ObjectId]) => {
    try {
      await Promise.all(
        listUserId.map(async (userId) => {
          const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId),
          });
          if (!user)
            return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));
          user.is_active = false;
          await user.saveAsync();
        })
      );
      return Promise.resolve(UserSuccessMessage.BLOCK_USER_SUCCESS);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  get_me: async (req) => {
    try {
      const token = req.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);
      const query = {
        _id: new mongoose.Types.ObjectId(info._id),
        is_active: true,
      };
      const user = await userQuery.getById(query);
      if (!user)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));
      // const response = new UserResponseDTO().responseDTO(user);
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  importListUser: async (listUser) => {
    // try {
    //   let canImport = true;
    //   await Promise.all(
    //     listUser.map(async (user) => {
    //       const userFound = await User.findOne({ username: user.username });
    //       if (userFound) {
    //         canImport = false;
    //         return Promise.reject(
    //           new Error(AuthErrorMessage.USERNAME_IS_EXIST)
    //         );
    //       }
    //     })
    //   );
    //   if (canImport) {
    //     await Promise.all(
    //       listUser.map(async (user, index) => {
    //         await userService.create(user, index);
    //       })
    //     );
    //     return Promise.resolve(UserSuccessMessage.IMPORT_LIST_USER_SUCCESS);
    //   }
    // } catch (err) {
    //   return Promise.reject(err);
    // }
  },
  create: async (request, userCount) => {
    try {
      const userFound = await User.findOne({
        email: request._email,
      });
      if (userFound) {
        throw new Error(AuthErrorMessage.EMAIL_IS_EXIST);
      }
      // const userCountCurrent = userCount
      //   ? (await User.countDocuments()) + 1 + userCount
      //   : (await User.countDocuments()) + 1;
      // Register success
      const newUserDTO = new CreateUserResponseDTO().toJSON(request);
      const newUser = {
        ...newUserDTO,
      };
      const user = new User(newUser);
      const userSave = await user.saveAsync();
      // const response = new UserResponseDTO().responseDTO(userSave);
      return Promise.resolve(userSave);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  updateCurrentUser: async (user: any, body: any, files: any) => {
    try {
      const currentUser = await User.findOne({
        _id: new mongoose.Types.ObjectId(user._id),
      });

      if (!currentUser)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));

      if (body.fullname) {
        currentUser.fullname = body.fullname;
      }

      if (body.bio) {
        currentUser.bio = body.bio;
      }

      if (body.phone) {
        currentUser.phone = body.phone;
      }

      if (body.facebook_link) {
        currentUser.facebook_link = body.facebook_link;
      }

      if (body.instagram_link) {
        currentUser.instagram_link = body.instagram_link;
      }

      if (body.linkedin_link) {
        currentUser.linkedin_link = body.linkedin_link;
      }

      if (body.twitter_link) {
        currentUser.twitter_link = body.twitter_link;
      }

      if (body.youtube_link) {
        currentUser.youtube_link = body.youtube_link;
      }

      if (files) {
        const response = await fileService.upload(files);
        if (response) {
          currentUser.avatar = response.name;
        }
      }

      const userUpdate = await currentUser.save();
      return Promise.resolve(userUpdate);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export { userService };
