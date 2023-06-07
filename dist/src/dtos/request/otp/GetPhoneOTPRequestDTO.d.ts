export default class GetPhoneOTPRequestDTO {
    _phone: string;
    constructor({ phone }: {
        phone: any;
    });
    get phone(): string;
}
