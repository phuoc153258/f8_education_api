import { Types } from "mongoose";
import { IUser } from "../../../models/user";

export interface ICourseDetailResponseDTO {
  _id?: Types.ObjectId;
  title?: String;
  description?: String;
  slug?: String;
  image?: String;
  icon?: String;
  studentCount?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Boolean;
  deletedAt?: Date;
  isPublished?: Boolean;
  publishedAt?: Date;
  levelId?: Types.ObjectId;
  tracks?: any;
  isRegister?: Boolean;
  willLearns?: Array<any>;
  requirements?: Array<any>;
}
export default class CourseDetailResponseDTO {
  public _id?: Types.ObjectId;
  public _title?: String;
  public _description?: String;
  public _slug?: String;
  public _image?: String;
  public _icon?: String;
  public _studentCount?: Number;
  public _createdAt?: Date;
  public _updatedAt?: Date;
  public _isDeleted?: Boolean;
  public _deletedAt?: Date;
  public _isPublished?: Boolean;
  public _publishedAt?: Date;
  public _levelId?: Types.ObjectId;
  public _tracks?: any;
  public _isRegister?: Boolean;
  public _willLearns?: Array<any>;
  public _requirements?: Array<any>;

  get id() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get title() {
    return this.title;
  }
  setTitle(title: any) {
    this._title = title;
    return this;
  }

  get description() {
    return this._description;
  }
  setDescription(description: any) {
    this._description = description;
    return this;
  }

  get slug() {
    return this._slug;
  }
  setSlug(slug: any) {
    this._slug = slug;
    return this;
  }

  get image() {
    return this._image;
  }
  setImage(image: any) {
    this._image = image;
    return this;
  }

  get icon() {
    return this._icon;
  }
  setIcon(icon: any) {
    this._icon = icon;
    return this;
  }

  get studentCount() {
    return this._studentCount;
  }
  setStudentCount(studentCount: any) {
    this._studentCount = studentCount;
    return this;
  }

  get createdAt() {
    return this._createdAt;
  }
  setCreatedAt(createdAt: any) {
    this._createdAt = createdAt;
    return this;
  }

  get updatedAt() {
    return this._updatedAt;
  }
  setUpdatedAt(updatedAt: any) {
    this._updatedAt = updatedAt;
    return this;
  }

  get isDeleted() {
    return this._isDeleted;
  }
  setIsDeleted(isDeleted: any) {
    this._isDeleted = isDeleted;
    return this;
  }

  get deletedAt() {
    return this._deletedAt;
  }
  setDeletedAt(deletedAt: any) {
    this._deletedAt = deletedAt;
    return this;
  }

  get publishedAt() {
    return this._publishedAt;
  }
  setPublishedAt(publishedAt: any) {
    this._publishedAt = publishedAt;
    return this;
  }

  get isPublished() {
    return this._isPublished;
  }
  setIsPublished(isPublished: any) {
    this._isPublished = isPublished;
    return this;
  }

  get levelId() {
    return this._levelId;
  }
  setLevelId(levelId: any) {
    this._levelId = levelId;
    return this;
  }

  get tracks() {
    return this._tracks;
  }
  setTracks(tracks: any) {
    this._tracks = tracks;
    return this;
  }

  get willLearns() {
    return this._tracks;
  }
  setWillLearns(willLearns: any) {
    this._willLearns = willLearns;
    return this;
  }

  get requirements() {
    return this._tracks;
  }
  setRequirements(requirements: any) {
    this._requirements = requirements;
    return this;
  }

  get isRegister() {
    return this._isRegister;
  }
  setIsRegister(id: any, user_course: any) {
    this._isRegister = false;
    user_course.detailCourses.forEach((x) => {
      if (x.courseId.toString() == id.toString()) {
        this._isRegister = true;
      }
    });
    return this;
  }

  get(): ICourseDetailResponseDTO {
    const request: ICourseDetailResponseDTO = {
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
      willLearns: this._willLearns,
      requirements: this._requirements,
    };

    return request;
  }

  responseDTO(
    model: any,
    user_course: any,
    willLearns: any,
    requirements: any
  ) {
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
      .setWillLearns(willLearns)
      .setRequirements(requirements)
      .get();
  }
}
