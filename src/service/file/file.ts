import path from "path";
import { FILE_PATH } from "../../constants/file";
import { v4 as uuidv4 } from "uuid";
import { configFilePath } from "../helper/file";
import { BaseErrorMessage } from "../../messages/error/base";
import env from "../../../config/env";

interface IFileService {
  upload: (files: any) => Promise<any>;
  get: (fileName: string, res: any, next: any) => Promise<any>;
}

const fileService: IFileService = {
  upload: async (files) => {
    let filenames = {};
    Object.keys(files).forEach((key) => {
      let extFile = path.extname(files[key].name);
      let savePath = configFilePath(extFile);
      const fileName = uuidv4() + extFile;
      const filepath = path.join(
        __dirname,
        env.rootUpload,
        savePath + "/" + fileName
      );

      files[key].mv(filepath, (err) => {
        if (err)
          return Promise.reject(
            new Error(BaseErrorMessage.SOME_THING_WENT_WRONG)
          );
      });
      filenames[key] = fileName;
    });

    return Promise.resolve(filenames);
  },
  get: async (fileName, res, next) => {
    const savePath = configFilePath(path.extname(fileName));
    res.sendFile(
      path.join(
        path.join(__dirname, env.rootUpload, savePath + "/" + fileName)
      ),
      (err) => {
        if (err) {
          next(err);
        }
      }
    );
  },
};

export default fileService;
