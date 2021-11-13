import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: String,
      },
    ],
    classes: [
      {
        class_id: String,
      },
    ],
    logo_url: String,
  },
  {
    timestamps: true,
  }
);

const CourseModel =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default CourseModel;
