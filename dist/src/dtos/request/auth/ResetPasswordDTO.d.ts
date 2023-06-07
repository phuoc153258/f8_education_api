export default class RegisterRequestDTO {
    _email: string;
    _password: string;
    constructor({ email, password }: {
        email: any;
        password: any;
    });
    get email(): string;
    get password(): string;
}
