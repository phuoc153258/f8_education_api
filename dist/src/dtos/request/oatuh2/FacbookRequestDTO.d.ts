export default class FacebookRequestDTO {
    facebook_id?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    email?: string;
    password?: string;
    username?: string;
    type_account?: string;
    constructor(data: any);
    get(): this;
}
