import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  name: { type: String, required: true },
  userName: { type: String },
  image: { type: String, require: true },
  resume: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
