import { Types } from "mongoose";
export interface IUserResponseDTO {
    _id?: Types.ObjectId;
    avatar?: String;
    email?: String;
    email_verified?: boolean;
    is_active?: boolean;
    password?: String;
    phone?: String;
    type_account?: String;
    role?: Types.ObjectId;
    slug?: String;
    fullname?: String;
    bio?: String;
    facebook_id?: String;
    google_id?: String;
    github_id?: String;
}
export default class UserResponseDTO {
    _id?: Types.ObjectId;
    _avatar?: String;
    _email?: String;
    _email_verified?: boolean;
    _is_active?: boolean;
    _password?: String;
    _phone?: String;
    _type_account?: String;
    _roleId?: Types.ObjectId;
    _slug?: String;
    _fullname?: String;
    _bio?: String;
    _facebook_id?: String;
    _google_id?: String;
    _github_id?: String;
    get id(): Types.ObjectId;
    setId(id: Types.ObjectId): this;
    get avatar(): String;
    setAvatar(avatar: String): this;
    get email(): String;
    setEmail(email: String): this;
    get email_verified(): boolean;
    setEmail_verified(email_verified: boolean): this;
    get is_active(): boolean;
    setIs_active(is_active: boolean): this;
    get password(): String;
    setPassword(password: String): this;
    get phone(): String;
    setPhone(phone: String): this;
    get type_account(): String;
    setType_account(type_account: String): this;
    get roleId(): Types.ObjectId;
    setRoleId(roleId: Types.ObjectId): this;
    get slug(): String;
    setSlug(slug: String): this;
    get fullname(): String;
    setFullname(fullname: String): this;
    get bio(): String;
    setBio(bio: String): this;
    get facebook_id(): String;
    setFacebook_id(facebook_id: String): this;
    get google_id(): String;
    setGoogle_id(google_id: String): this;
    get github_id(): String;
    setGithub_id(github_id: String): this;
    get(): any;
    responseDTO(model: any): any;
}
