"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CombinedCourseResponseDTO {
    get id() {
        return this._id;
    }
    setId(id) {
        this._id = id;
        return this;
    }
    get title() {
        return this.title;
    }
    setTitle(title) {
        this._title = title;
        return this;
    }
    get description() {
        return this._description;
    }
    setDescription(description) {
        this._description = description;
        return this;
    }
    get slug() {
        return this._slug;
    }
    setSlug(slug) {
        this._slug = slug;
        return this;
    }
    get image() {
        return this._image;
    }
    setImage(image) {
        this._image = image;
        return this;
    }
    get icon() {
        return this._icon;
    }
    setIcon(icon) {
        this._icon = icon;
        return this;
    }
    get studentCount() {
        return this._studentCount;
    }
    setStudentCount(studentCount) {
        this._studentCount = studentCount;
        return this;
    }
    get createdAt() {
        return this._createdAt;
    }
    setCreatedAt(createdAt) {
        this._createdAt = createdAt;
        return this;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    setUpdatedAt(updatedAt) {
        this._updatedAt = updatedAt;
        return this;
    }
    get isDeleted() {
        return this._isDeleted;
    }
    setIsDeleted(isDeleted) {
        this._isDeleted = isDeleted;
        return this;
    }
    get deletedAt() {
        return this._deletedAt;
    }
    setDeletedAt(deletedAt) {
        this._deletedAt = deletedAt;
        return this;
    }
    get publishedAt() {
        return this._publishedAt;
    }
    setPublishedAt(publishedAt) {
        this._publishedAt = publishedAt;
        return this;
    }
    get isPublished() {
        return this._isPublished;
    }
    setIsPublished(isPublished) {
        this._isPublished = isPublished;
        return this;
    }
    get levelId() {
        return this._levelId;
    }
    setLevelId(levelId) {
        this._levelId = levelId;
        return this;
    }
    get tracks() {
        return this._tracks;
    }
    setTracks(tracks) {
        this._tracks = tracks;
        return this;
    }
    get isRegister() {
        return this._isRegister;
    }
    setIsRegister(id, user_course) {
        this._isRegister = false;
        if (user_course != undefined) {
            user_course.detailCourses.forEach((x) => {
                if (x.courseId.toString() == id.toString()) {
                    this._isRegister = true;
                }
            });
        }
        return this;
    }
    get() {
        const request = {
            _id: this._id,
            title: this._title,
            description: this._description,
            slug: this._slug,
            image: this._image,
            icon: this._icon,
            studentCount: this._studentCount,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            isDeleted: this._isDeleted,
            deletedAt: this._deletedAt,
            isPublished: this._isPublished,
            publishedAt: this._publishedAt,
            levelId: this._levelId,
            tracks: this._tracks,
            isRegister: this._isRegister,
        };
        return request;
    }
    responseDTO(model, user_course) {
        if (!model) {
            return null;
        }
        return this.setId(model._id)
            .setTitle(model.title)
            .setDescription(model.description)
            .setSlug(model.slug)
            .setImage(model.image)
            .setIcon(model.icon)
            .setStudentCount(model.studentCount)
            .setCreatedAt(model.createdAt)
            .setUpdatedAt(model.updatedAt)
            .setIsDeleted(model.isDeleted)
            .setDeletedAt(model.deletedAt)
            .setIsPublished(model.isPublished)
            .setPublishedAt(model.publishedAt)
            .setLevelId(model.levelId)
            .setTracks(model.tracks)
            .setIsRegister(model._id, user_course)
            .get();
    }
}
exports.default = CombinedCourseResponseDTO;
//# sourceMappingURL=CombinedCourseResponseDTO.js.map