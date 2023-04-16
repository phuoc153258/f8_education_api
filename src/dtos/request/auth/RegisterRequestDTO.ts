export default class RegisterRequestDTO {
  public _fullname: string;
  public _password: string;
  public _email: string;

  constructor({ fullname, password, email }) {
    this._fullname = fullname;
    this._password = password;
    this._email = email;
  }

  get fullname() {
    return this._fullname;
  }

  get password() {
    return this._password;
  }

  get email() {
    return this._email;
  }
}
