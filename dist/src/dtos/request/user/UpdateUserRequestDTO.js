"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateUserRequestDTO {
    get avatarUpload() {
        return this._phone;
    }
    setAvatarUpload(avatarUpload) {
        this._avatarUpload = avatarUpload;
        return this;
    }
    get phone() {
        return this._phone;
    }
    setPhone(phone) {
        this._phone = phone;
        return this;
    }
    get email() {
        return this._email;
    }
    setEmail(email) {
        this._email = email;
        return this;
    }
    get id() {
        return this._id;
    }
    setId(id) {
        this._id = id;
        return this;
    }
    get first_name() {
        return this._first_name;
    }
    setFirst_name(first_name) {
        this._first_name = first_name;
        return this;
    }
    get last_name() {
        return this._last_name;
    }
    setLast_name(last_name) {
        this._last_name = last_name;
        return this;
    }
    get username() {
        return this._username;
    }
    setUserName(username) {
        this._username = username;
        return this;
    }
    get role() {
        return this._role;
    }
    setRole(role) {
        this._role = role;
        return this;
    }
    get avatar() {
        return this._last_name;
    }
    setAvatar(avatar) {
        this._avatar = avatar;
        return this;
    }
    get is_active() {
        return this._is_active;
    }
    setIs_Active(is_active) {
        this._is_active = is_active;
        return this;
    }
    toUpdateJSON() {
        const request = {
            first_name: this._first_name,
            last_name: this._last_name,
            username: this._username,
            role: this._role,
            avatar: this._avatar,
            is_active: this.is_active,
            email: this._email,
            phone: this._phone,
            avatarUpload: this._avatarUpload,
        };
        return request;
    }
    requestDTO(model) {
        if (!model)
            return null;
        const dto = new UpdateUserRequestDTO()
            .setUserName(model.username)
            .setFirst_name(model.first_name)
            .setLast_name(model.last_name)
            .setAvatar(model.avatar)
            .setRole(model.role)
            .setIs_Active(model.is_active)
            .setEmail(model.email)
            .setAvatarUpload(model.avatarUpload)
            .setPhone(model.phone);
        return dto.toUpdateJSON();
    }
}
exports.default = UpdateUserRequestDTO;
//# sourceMappingURL=UpdateUserRequestDTO.js.map