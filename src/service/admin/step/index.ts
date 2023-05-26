import mongoose, { Types } from "mongoose";
import { Course } from "../../../models/course";
import { Course_Will_Learn } from "../../../models/course_will_learn";
import courseService from "../course";
import { Track } from "../../../models/track";
import { title } from "process";
import { Step } from "../../../models/step";

const stepService: any = {
  position: async (id: any) => {
    try {
      const trackModel = await Track.findOne({
        _id: mongoose.Types.ObjectId(id),
      }).exec();
      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      const stepModel = await Step.find({ trackId: trackModel._id });

      return { trackId: trackModel._id, position: stepModel.length };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async (step: any) => {
    try {
      const trackModel = await Track.findOne({
        _id: mongoose.Types.ObjectId(step.trackId),
      }).exec();
      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));
      const position = await stepService.position(trackModel._id);
      if (step.position > position.position)
        return Promise.reject(new Error("Position is not valid !!!"));

      const steps = await Step.find({
        position: { $gte: step.position },
        trackId: trackModel._id,
      });

      steps.forEach(async (item) => {
        item.position += 1;
        await item.save();
      });
      const newStepModel = new Step();

      if (step.title) newStepModel.title = step.title;
      if (step.duration) newStepModel.duration = step.duration;
      if (step.description) newStepModel.description = step.description;
      if (step.imageUrl) newStepModel.imageUrl = step.imageUrl;
      if (step.videoUrl) newStepModel.videoUrl = step.videoUrl;

      newStepModel.position = step.position;

      newStepModel.isPublished = step.isPublished;

      if (step.trackId)
        newStepModel.trackId = mongoose.Types.ObjectId(step.trackId);
      await newStepModel.save();
      return await courseService.detail(trackModel.courseId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id: any) => {
    try {
      const stepModel = await Step.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!stepModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      const trackModel = await Track.findOne({
        _id: stepModel.trackId,
      });
      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      const steps = await Step.find({
        position: { $gt: stepModel.position },
        trackId: trackModel._id,
      });

      steps.forEach(async (item) => {
        item.position -= 1;
        await item.save();
      });
      await stepModel.delete();
      return await courseService.detail(trackModel.courseId);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id: any, step: any) => {
    try {
      const stepModel = await Step.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!stepModel) return Promise.reject(new Error("Step is not exits !!!"));

      const trackModel = await Track.findOne({
        _id: step.trackId,
      });

      if (!trackModel)
        return Promise.reject(new Error("Track is not exits !!!"));

      if (stepModel.trackId.toString() == step.trackId) {
        if (stepModel.position > step.position) {
          const steps = await Step.find({
            position: { $gte: step.position, $lt: stepModel.position },
            trackId: trackModel._id,
          });
          steps.forEach(async (item) => {
            item.position += 1;
            await item.save();
          });
        } else if (stepModel.position < step.position) {
          const steps = await Step.find({
            position: { $gt: stepModel.position, $lte: step.position },
            trackId: trackModel._id,
          });
          steps.forEach(async (item) => {
            item.position -= 1;
            await item.save();
          });
        }
      } else {
        // cap nhat lai position cua track cu~
        const stepsOld = await Step.find({
          position: { $gt: stepModel.position },
          trackId: stepModel.trackId,
        });

        stepsOld.forEach(async (item) => {
          item.position -= 1;
          await item.save();
        });

        // cap nhat lai position cua track moi

        if (stepModel.position > step.position) {
          const steps = await Step.find({
            position: { $gte: step.position, $lt: stepModel.position },
            trackId: trackModel._id,
          });
          steps.forEach(async (item) => {
            item.position += 1;
            await item.save();
          });
        } else if (stepModel.position < step.position) {
          const steps = await Step.find({
            position: { $gt: stepModel.position, $lte: step.position },
            trackId: trackModel._id,
          });
          steps.forEach(async (item) => {
            item.position -= 1;
            await item.save();
          });
        }
      }

      if (step.title) stepModel.title = step.title;
      if (step.description) stepModel.title = step.title;
      // if (step.duration) stepModel.duration = step.duration;
      if (step.videoUrl) stepModel.videoUrl = step.videoUrl;
      if (step.imageUrl) stepModel.imageUrl = step.imageUrl;

      stepModel.position = step.position;

      stepModel.isPublished = step.isPublished;

      if (step.trackId) stepModel.trackId = step.trackId;
      await stepModel.save();
      return await courseService.detail(trackModel.courseId);
      //   return "DSA";
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default stepService;
