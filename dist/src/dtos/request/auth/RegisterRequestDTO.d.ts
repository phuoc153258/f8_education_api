export default class RegisterRequestDTO {
    _fullname: string;
    _password: string;
    _email: string;
    constructor({ fullname, password, email }: {
        fullname: any;
        password: any;
        email: any;
    });
    get fullname(): string;
    get password(): string;
    get email(): string;
}
