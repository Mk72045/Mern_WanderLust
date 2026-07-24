import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, requited: true}
});

export default model("User", userSchema);
