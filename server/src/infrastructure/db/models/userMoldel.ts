import mongoose, { Schema, model } from "mongoose";
import { User } from "../../../entities/User";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
  },
});

export const UserModel = model<User>("User", userSchema);
