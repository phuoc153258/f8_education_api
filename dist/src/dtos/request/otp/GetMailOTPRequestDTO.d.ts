export default class GetMailOTPRequestDTO {
    _email: string;
    constructor({ email }: {
        email: any;
    });
    get email(): string;
}
