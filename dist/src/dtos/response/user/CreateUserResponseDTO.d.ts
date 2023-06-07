import RegisterRequestDTO from "../../request/auth/RegisterRequestDTO";
export interface ICreateUserResponseDTIO {
    fullname?: String;
    password?: String;
    email?: String;
}
export default class CreateUserResponseDTO {
    _fullname?: String;
    _password?: String;
    _email?: String;
    get fullname(): String;
    setfullname(_fullname: String): this;
    get password(): String;
    setPassword(_password: String): this;
    get email(): String;
    setEmail(_email: String): this;
    get(): ICreateUserResponseDTIO;
    toJSON(model: RegisterRequestDTO): ICreateUserResponseDTIO;
}
