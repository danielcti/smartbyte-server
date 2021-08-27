import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    duration: Number,
  },
  {
    timestamps: true,
  }
);

const ClassModel =
  mongoose.models.Class || mongoose.model("Class", ClassSchema);

export default ClassModel;
