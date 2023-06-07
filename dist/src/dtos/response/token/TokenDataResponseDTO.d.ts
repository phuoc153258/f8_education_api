export default class TokenDataResponseDTO {
    _data?: any;
    _secret?: string;
    _expire_in?: string;
    constructor({ data, secret, expire_in }: {
        data: any;
        secret: any;
        expire_in: any;
    });
    get data(): any;
    get secret(): string;
    get expire_in(): string;
}
