import mongoose, { Types } from "mongoose";
import { Course } from "../../../models/course";
import { Course_Will_Learn } from "../../../models/course_will_learn";
import courseService from "../course";
import { Track } from "../../../models/track";
import { title } from "process";

const trackService: any = {
  position: async (id: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      const trackModel = await Track.find({ courseId: courseModel._id });

      return { courseId: courseModel._id, position: trackModel.length };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async (track: any) => {
    try {
      const courseModel = await Course.findOne({
        _id: mongoose.Types.ObjectId(track.courseId),
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));
      const position = await trackService.position(courseModel._id);
      if (track.position > position.position)
        return Promise.reject(new Error("Position is not valid !!!"));

      const tracks = await Track.find({
        position: { $gte: track.position },
        courseId: courseModel._id,
      });

      tracks.forEach(async (item) => {
        item.position += 1;
        await item.save();
      });
      const trackModel = new Track();

      if (track.title) trackModel.title = track.title;

      trackModel.position = track.position;

      trackModel.isPublished = track.isPublished;

      if (track.courseId)
        trackModel.courseId = mongoose.Types.ObjectId(track.courseId);
      await trackModel.save();
      return await courseService.detail(courseModel._id);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id: any) => {
    try {
      const trackModel = await Track.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      const courseModel = await Course.findOne({
        _id: trackModel.courseId,
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));

      const tracks = await Track.find({
        position: { $gt: trackModel.position },
        courseId: courseModel._id,
      });

      tracks.forEach(async (item) => {
        item.position -= 1;
        await item.save();
      });
      await trackModel.delete();
      return await courseService.detail(courseModel._id);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id: any, track: any) => {
    try {
      const trackModel = await Track.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      const courseModel = await Course.findOne({
        _id: trackModel.courseId,
      });
      if (!courseModel)
        return Promise.reject(new Error("Course is not exits !!!"));
      if (trackModel.position > track.position) {
        const tracks = await Track.find({
          position: { $gte: track.position, $lt: trackModel.position },
          courseId: courseModel._id,
        });
        tracks.forEach(async (item) => {
          item.position += 1;
          await item.save();
        });
      } else if (trackModel.position < track.position) {
        const tracks = await Track.find({
          position: { $gt: trackModel.position, $lte: track.position },
          courseId: courseModel._id,
        });
        tracks.forEach(async (item) => {
          item.position -= 1;
          await item.save();
        });
      }

      if (track.title) trackModel.title = track.title;

      trackModel.position = track.position;

      trackModel.isPublished = track.isPublished;

      if (track.courseId)
        trackModel.courseId = mongoose.Types.ObjectId(track.courseId);
      await trackModel.save();
      return await courseService.detail(courseModel._id);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default trackService;
