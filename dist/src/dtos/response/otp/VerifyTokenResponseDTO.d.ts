export default class TokenDataResponseDTO {
    _email?: string;
    constructor({ email }: {
        email: any;
    });
    get email(): string;
}
