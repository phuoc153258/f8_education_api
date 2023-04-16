import { IUser } from "../../../models/user";
import RegisterRequestDTO from "../../request/auth/RegisterRequestDTO";

export interface ICreateUserResponseDTIO {
  fullname?: String;
  password?: String;
  email?: String;
}
export default class CreateUserResponseDTO {
  public _fullname?: String;
  public _password?: String;
  public _email?: String;

  get fullname() {
    return this._fullname;
  }

  setfullname(_fullname: String) {
    this._fullname = _fullname;
    return this;
  }
  get password() {
    return this._fullname;
  }

  setPassword(_password: String) {
    this._password = _password;
    return this;
  }
  get email() {
    return this._fullname;
  }

  setEmail(_email: String) {
    this._email = _email;
    return this;
  }

  get(): ICreateUserResponseDTIO {
    const request: ICreateUserResponseDTIO = {
      fullname: this._fullname,
      password: this._password,
      email: this._email,
    };

    return request;
  }
  toJSON(model: RegisterRequestDTO) {
    if (!model) return null;
    return this.setfullname(model.fullname)
      .setPassword(model.password)
      .setEmail(model.email)
      .get();
  }
}
