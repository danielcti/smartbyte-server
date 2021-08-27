import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    courses: [
      {
        course_id: String,
        active: Boolean,
        classes: [
          {
            class_id: String,
            last_video_time_watched: Number,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
