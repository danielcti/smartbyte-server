import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
},
password_hash: {
    type: String,
    required: true
},
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;