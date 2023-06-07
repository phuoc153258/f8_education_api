export default class OTPRequestDTO {
    _email: string;
    _otp: string;
    constructor({ email, otp }: {
        email: any;
        otp: any;
    });
    get otp(): string;
    get email(): string;
}
