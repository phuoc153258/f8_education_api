import { Types } from "mongoose";
// import { IUser } from "../../../models/user";

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
  public _id?: Types.ObjectId;
  public _avatar?: String;
  public _email?: String;
  public _email_verified?: boolean;
  public _is_active?: boolean;
  public _password?: String;
  public _phone?: String;
  public _type_account?: String;
  public _roleId?: Types.ObjectId;
  public _slug?: String;
  public _fullname?: String;
  public _bio?: String;
  public _facebook_id?: String;
  public _google_id?: String;
  public _github_id?: String;

  get id() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get avatar() {
    return this._avatar;
  }
  setAvatar(avatar: String) {
    this._avatar = avatar;
    return this;
  }
  get email() {
    return this._email;
  }
  setEmail(email: String) {
    this._email = email;
    return this;
  }
  get email_verified() {
    return this._email_verified;
  }
  setEmail_verified(email_verified: boolean) {
    this._email_verified = email_verified;
    return this;
  }
  get is_active() {
    return this._is_active;
  }
  setIs_active(is_active: boolean) {
    this._is_active = is_active;
    return this;
  }
  get password() {
    return this._password;
  }
  setPassword(password: String) {
    this._password = password;
    return this;
  }
  get phone() {
    return this._phone;
  }
  setPhone(phone: String) {
    this._phone = phone;
    return this;
  }
  get type_account() {
    return this._type_account;
  }
  setType_account(type_account: String) {
    this._type_account = type_account;
    return this;
  }
  get roleId() {
    return this._roleId;
  }
  setRoleId(roleId: Types.ObjectId) {
    this._roleId = roleId;
    return this;
  }
  get slug() {
    return this._slug;
  }
  setSlug(slug: String) {
    this._slug = slug;
    return this;
  }
  get fullname() {
    return this._fullname;
  }
  setFullname(fullname: String) {
    this._fullname = fullname;
    return this;
  }
  get bio() {
    return this._bio;
  }
  setBio(bio: String) {
    this._bio = bio;
    return this;
  }
  get facebook_id() {
    return this._facebook_id;
  }
  setFacebook_id(facebook_id: String) {
    this._facebook_id = facebook_id;
    return this;
  }
  get google_id() {
    return this._google_id;
  }
  setGoogle_id(google_id: String) {
    this._google_id = google_id;
    return this;
  }
  get github_id() {
    return this._github_id;
  }
  setGithub_id(github_id: String) {
    this._github_id = github_id;
    return this;
  }

  get(): any {
    const request: any = {
      _id: this._id,
      avatar: this._avatar,
      email: this._email,
      email_verified: this._email_verified,
      is_active: this._is_active,
      password: this._password,
      phone: this._phone,
      type_account: this._type_account,
      roleId: this._roleId,
      slug: this._slug,
      fullname: this._fullname,
      bio: this._bio,
      facebook_id: this._facebook_id,
      google_id: this._google_id,
      github_id: this._github_id,
    };

    return request;
  }

  responseDTO(model: any) {
    if (!model) return null;
    return (
      this.setId(model._id)
        .setAvatar(model.avatar)
        .setEmail(model.email)
        .setEmail_verified(model.email_verified)
        .setIs_active(model.is_active)
        // .setPassword(model.password)
        .setPhone(model.phone)
        .setType_account(model.type_account)
        .setRoleId(model.roleId)
        .setSlug(model.slug)
        .setFullname(model.fullname)
        .setBio(model.bio)
        .setFacebook_id(model.facebook_id)
        .setGoogle_id(model.google_id)
        .setGithub_id(model.github_id)
        .get()
    );
  }
}
