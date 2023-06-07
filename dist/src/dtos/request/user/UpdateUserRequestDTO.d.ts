export interface IUpdateUserRequestDTO {
    first_name?: string;
    last_name?: string;
    username?: string;
    password?: string;
    role?: Object;
    avatar?: string;
    is_active?: boolean;
    email?: string;
    phone?: string;
    avatarUpload?: Object;
}
export default class UpdateUserRequestDTO {
    _id?: string;
    _first_name?: string;
    _last_name?: string;
    _username?: string;
    _role?: Object;
    _avatar?: string;
    _is_active?: boolean;
    _email?: string;
    _phone?: string;
    _avatarUpload?: Object;
    get avatarUpload(): string;
    setAvatarUpload(avatarUpload: Object): this;
    get phone(): string;
    setPhone(phone: string): this;
    get email(): string;
    setEmail(email: string): this;
    get id(): string;
    setId(id: string): this;
    get first_name(): string;
    setFirst_name(first_name: string): this;
    get last_name(): string;
    setLast_name(last_name: string): this;
    get username(): string;
    setUserName(username: string): this;
    get role(): Object;
    setRole(role: Object): this;
    get avatar(): string;
    setAvatar(avatar: string): this;
    get is_active(): boolean;
    setIs_Active(is_active: boolean): this;
    toUpdateJSON(): IUpdateUserRequestDTO;
    requestDTO(model: any): IUpdateUserRequestDTO;
}
