export default class LoginRequestDTO {
    _email: string;
    _password: string;
    constructor({ email, password }: {
        email: any;
        password: any;
    });
    get email(): string;
    get password(): string;
}
