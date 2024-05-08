import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, default: "guest" },
  handle: { type: String, require: true },
  bio: { type: String, default: "default bio" },
  email: { type: String, require: true, unique: true },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/4140/4140046.png",
  },
  password: { type: String, require: true },
  link: [
    {
      url: { type: String },
      title: { type: String },
    },
  ],
  social: [
    {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
  ],
  linkTreeViews: { type: Number, default: 0 },
  themes: [
    {
      id: { type: Number },
      name: { type: String, default: "default" },
      colors: { type: Array, default: ["1d1d1d", "1d1d1d", "cccccc"] },
    },
    {
      id: { type: Number },
      name: { type: String, default: "theme1" },
      colors: { type: Array, default: ["2c3e50", "1d1f0f", "1abc9c"] },
    },
  ],
  currentTheme: {
    id: { type: Number },
    name: { type: String, default: "default" },
    colors: { type: Array, default: ["1d1d1d", "1d1d1d", "cccccc"] },
  },
});
const user = new mongoose.model("user", userSchema);
export default user;
